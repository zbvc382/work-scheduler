using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Dtos;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class JobRepository : RepositoryBase<Job>, IJobRepository
    {
        private readonly IAgencyRpository _agencyRpository;
        private readonly IApplianceTypeRepository _applianceRepository;

        public JobRepository(DataContext dataContext, IAgencyRpository agencyRpository, IApplianceTypeRepository applianceRepository) : base(dataContext) {
            _agencyRpository = agencyRpository;
            _applianceRepository = applianceRepository;
        }

        public async Task<List<Job>> GetJobs()
        {
            return await FindAll().Include(j => j.JobTags)
                                  .ThenInclude(t => t.Tag)
                                  .Include(j => j.Agency)
                                  .Include(j => j.ApplianceType)
                                  .Include(j => j.Photos)
                                  .ToListAsync();
        }

        public async Task<Job> GetJobAsync(int id)
        {
            return await FindAll().Include(j => j.JobTags)
                                  .ThenInclude(t => t.Tag)
                                  .Include(j => j.Agency)
                                  .Include(j => j.ApplianceType)
                                  .Include(j => j.Photos)
                                  .FirstOrDefaultAsync(j => j.Id == id);
        }

        public Job GetJob(int id)
        {
            return FindAll().Include(j => j.JobTags)
                            .ThenInclude(t => t.Tag)
                            .Include(j => j.Agency)
                            .Include(j => j.ApplianceType)
                            .Include(j => j.Photos)
                            .FirstOrDefault(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobsByWeek(DateTime start)
        {
            var end = BusinessDays.getEndDate(start);
            return await FindByCondition(x => x.DateAssigned >= start && x.DateAssigned < end)
                                        .Include(j => j.JobTags)
                                        .ThenInclude(t => t.Tag)
                                        .Include(j => j.Agency)
                                        .Include(j => j.ApplianceType)
                                        .Include(j => j.Photos)
                                        .ToListAsync();
        }

        public async Task<PagedJobs<Job>> SearchAllJobs(SearchParams searchParams)
        {
            IQueryable<Job> jobs;

            if (searchParams.DateFrom != null)
            {
                jobs = FindByCondition(x => x.DateAssigned >= searchParams.DateFrom &&
                (x.Address.ContainsWords(searchParams.Query)
                || x.PostCode.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.Agency.Name.ContainsWords(searchParams.Query)
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.JobNumber.ContainsWords(searchParams.Query)
                )).Include(j => j.JobTags)
                  .ThenInclude(t => t.Tag)
                  .Include(j => j.Agency)
                  .Include(j => j.ApplianceType)
                  .Include(j => j.Photos)
                  .OrderByDescending(x => x.DateAssigned);
            }

            else
            {
                jobs = FindByCondition(x => x.Address.ContainsWords(searchParams.Query)
                || x.PostCode.ContainsWords(searchParams.Query)
                || x.Agency.Name.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.JobNumber.ContainsWords(searchParams.Query)
                ).Include(j => j.JobTags)
                 .ThenInclude(t => t.Tag)
                 .Include(j => j.Agency)
                 .Include(j => j.ApplianceType)
                 .Include(j => j.Photos)
                 .OrderByDescending(x => x.DateAssigned);
            }

            return await PagedJobs<Job>.CreateAsync(jobs, searchParams.PageNumber, searchParams.PageSize);
        }

        public void AddTag(Tag tag, Job job)
        {
            var exisits = DataContext.JobTags.Any(x => x.JobId == job.Id && x.TagId == tag.Id);

            if (!exisits)
            {
                job.JobTags.Add(new JobTag { Job = job, Tag = tag});
            }
        }

        public void UpdateTags(UpdateJob updateJob) {
            var job = this.DataContext.Jobs.Include(x => x.JobTags).ThenInclude(x => x.Tag).Single(x => x.Id == updateJob.Id);
            var unselectedTags = updateJob.UnselectedTags;
            var selectedTags = updateJob.SelectedTags;

            foreach (var item in unselectedTags)
            {
                var exists = job.JobTags.Any(x => x.TagId == item);

                if (exists) {
                    var jobTag = job.JobTags.Single(x => x.TagId == item);
                    
                    job.JobTags.Remove(jobTag);
                }
            }
            
            foreach (var item in selectedTags)
            {
                var exists = job.JobTags.Any(x => x.TagId == item);

                if (!exists) {
                    var newTag = this.DataContext.Tags.Single(x => x.Id == item);
        
                    job.JobTags.Add(new JobTag
                    {
                        Job = job,
                        Tag = newTag
                    });
                
                }
            }
            
        }

        public async Task<Job> AddJob(Job job)
        {

            if (job.Agency != null)
            {
                if (job.Agency.Id == 0)
                {
                    var agency = new Agency { Name = job.Agency.Name };
                    await _agencyRpository.CreateAsync(agency);
                    job.Agency = agency;
                }

                else
                {
                    var agency = _agencyRpository.FindAll().FirstOrDefault(x => x.Id == job.Agency.Id);
                    job.Agency = agency;
                }
            }

            if (job.ApplianceType != null) {
                
                var applianceType = await _applianceRepository.FindAll().FirstOrDefaultAsync(x => x.Id == job.ApplianceType.Id);
                job.ApplianceType = applianceType;
            }

            return await CreateAsync(job);
        }

        public Job GetJobByJobNumber(string jobNumber) {
            var job = DataContext.Jobs
            .Include(x => x.Agency)
            .Include(x => x.ApplianceType)
            .FirstOrDefault(x => x.JobNumber == jobNumber);

            return job;
        }
    }
}