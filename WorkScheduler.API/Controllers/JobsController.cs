using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkScheduler.API.Data;
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

        public JobsController(IJobRepository jobRepository, ITagRepository tagRepository)
        {
            this._tagRepository = tagRepository;
            this._jobRepository = jobRepository;

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var jobsToReturn = await _jobRepository.GetJobs();

            return Ok(jobsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetJob")]
        public async Task<IActionResult> GetJob(int id)
        {
            var jobToReturn = await _jobRepository.GetJobAsync(id);

            return Ok(jobToReturn);
        }

        [AllowAnonymous]
        [HttpPost("{id}")]
        public IActionResult AddExtraVisitJob([FromRoute] int id, [FromBody] Job job)
        {
            var lastVisitJob = _jobRepository.GetJob(id);

            if (lastVisitJob != null)
            {
                var visit = lastVisitJob.Visit + 1;
                var jobNumber = lastVisitJob.JobNumber;

                var currentVisitJob = _jobRepository.Create(job);
                currentVisitJob.JobNumber = jobNumber;
                currentVisitJob.Visit = visit;

                _jobRepository.Save();

                return CreatedAtRoute("GetJob", new { id = currentVisitJob.Id }, currentVisitJob);

            }

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult AddJob(Job job)
        {
            var jobToReturn = _jobRepository.Create(job);
            _jobRepository.Save();

            jobToReturn.Visit = 1;
            jobToReturn.JobNumber = 'J' + (_baseJobNumber + jobToReturn.Id).ToString();

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
                var tagToAdd =  _tagRepository.GetTag(id);

                if (tagToAdd != null) {
                    _jobRepository.AddTag(tagToAdd, jobToUpdate);
                }
            }

            if (await _jobRepository.SaveAsync()) {
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