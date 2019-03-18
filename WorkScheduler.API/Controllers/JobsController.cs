using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkScheduler.API.Data;
using WorkScheduler.API.Dtos;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private const int _baseJobNumber = 5000;
        private readonly IJobRepository _jobRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public JobsController(IJobRepository jobRepository,
                              ITagRepository tagRepository,
                              IAgencyRpository agencyRpository,
                              IMapper mapper)
        {
            this._tagRepository = tagRepository;
            this._mapper = mapper;
            this._jobRepository = jobRepository;

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var jobs = await _jobRepository.GetJobs();
            var jobsToReturn = _mapper.Map<List<JobToReturnDto>>(jobs);

            return Ok(jobsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetJob")]
        public async Task<IActionResult> GetJob(int id)
        {
            var job = await _jobRepository.GetJobAsync(id);

            var jobToReturn = _mapper.Map<JobToReturnDto>(job);

            return Ok(jobToReturn);
        }

        [AllowAnonymous]
        [HttpPost("{id}")]
        public async Task<IActionResult> AddExtraVisitJob([FromRoute] int id, [FromBody] JobToCreateDto jobToCreateDto)
        {
            var jobToCreate = _mapper.Map<Job>(jobToCreateDto);

            var lastVisitJob = _jobRepository.GetJob(id);

            if (lastVisitJob != null)
            {
                var visit = lastVisitJob.Visit + 1;
                var jobNumber = lastVisitJob.JobNumber;

                var currentVisitJob = await _jobRepository.AddJob(jobToCreate);
                currentVisitJob.JobNumber = jobNumber;
                currentVisitJob.Visit = visit;

                if (await _jobRepository.SaveAsync())
                {
                    var jobToReturn = _mapper.Map<JobToReturnDto>(currentVisitJob);
                    return CreatedAtRoute("GetJob", new { id = jobToReturn.Id }, jobToReturn);
                }

                throw new Exception($"Adding job failed on save");
            }

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddJob(JobToCreateDto jobToCreateDto)
        {
            var jobToCreate = _mapper.Map<Job>(jobToCreateDto);

            var jobToReturn = await _jobRepository.AddJob(jobToCreate);
            _jobRepository.Save();

            jobToReturn.Visit = 1;
            jobToReturn.JobNumber = "JB" + (_baseJobNumber + jobToReturn.Id).ToString();

            _jobRepository.Update(jobToReturn);
            _jobRepository.Save();

            return CreatedAtRoute("GetJob", new { id = jobToReturn.Id }, jobToReturn);

        }

        [AllowAnonymous]
        [HttpGet("date/{date}")]
        public async Task<IActionResult> getJobWeek(DateTime date)
        {
            var jobsToReturn = await _jobRepository.GetJobsByWeek(date);

            return Ok(jobsToReturn);
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> updateJob(UpdateJob updateJob)
        {
            var jobToUpdate = _jobRepository.GetJob(updateJob.Id);

            foreach (var id in updateJob.TagIds)
            {
                var tagToAdd = _tagRepository.GetTag(id);

                if (tagToAdd != null)
                {
                    _jobRepository.AddTag(tagToAdd, jobToUpdate);
                }
            }

            if (await _jobRepository.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception($"Updating job id:{jobToUpdate.Id} failed on save");
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult deleteJob(int id)
        {
            var jobToDelete = _jobRepository.GetJob(id);

            if (jobToDelete != null)
            {
                _jobRepository.Delete(jobToDelete);
                _jobRepository.Save();

                return NoContent();
            }

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<IActionResult> searchJobs([FromQuery] SearchParams searchParams)
        {
            if (!string.IsNullOrEmpty(searchParams.Query))
            {
                var pagedJobs = await _jobRepository.SearchAllJobs(searchParams);

                if (pagedJobs != null)
                {
                    Response.AddPagination(pagedJobs.TotalCount);
                    return Ok(pagedJobs);
                }

                else
                {
                    return NoContent();
                }
            }
            return BadRequest();
        }
    }
}