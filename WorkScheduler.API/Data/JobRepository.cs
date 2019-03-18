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

        public JobRepository(DataContext dataContext, IAgencyRpository agencyRpository) : base(dataContext) {
            _agencyRpository = agencyRpository;
        }

        public async Task<List<Job>> GetJobs()
        {
            return await FindAll().Include(j => j.JobTags).ThenInclude(t => t.Tag).Include(j => j.Agency).ToListAsync();
        }

        public async Task<Job> GetJobAsync(int id)
        {
            return await FindAll().Include(j => j.JobTags).Include(j => j.Agency).FirstOrDefaultAsync(j => j.Id == id);
        }

        public Job GetJob(int id)
        {
            return FindAll().Include(j => j.JobTags).Include(j => j.Agency).FirstOrDefault(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobsByWeek(DateTime start)
        {
            var end = BusinessDays.getEndDate(start);
            return await FindByCondition(x => x.DateAssigned >= start && x.DateAssigned < end)
                                        .Include(j => j.JobTags).Include(j => j.Agency)
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
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                )).OrderByDescending(x => x.DateAssigned);
            }

            else
            {
                jobs = FindByCondition(x => x.Address.ContainsWords(searchParams.Query)
                || x.PostCode.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                ).OrderByDescending(x => x.DateAssigned);
            }

            return await PagedJobs<Job>.CreateAsync(jobs, searchParams.PageNumber, searchParams.PageSize);
        }

        public void AddTag(Tag tag, Job job) {
            job.JobTags.Add(new JobTag
            {
                Job = job,
                Tag = tag
            }
            );
        }

        public async Task<Job> AddJob(Job job)
        {

            if (job.Agency != null)
            {
                if (job.Agency.Id == 0)
                {
                    var agency = new Agency() { Name = job.Agency.Name };
                    await _agencyRpository.CreateAsync(agency);
                    job.Agency = agency;
                }

                else
                {
                    var agency = _agencyRpository.FindAll().FirstOrDefault(x => x.Id == job.Agency.Id);
                    job.Agency = agency;
                }
            }

            return await CreateAsync(job);
        }
    }
}