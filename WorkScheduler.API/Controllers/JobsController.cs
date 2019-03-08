using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkScheduler.API.Data;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {

        private readonly IJobRepository _jobRepository;

        public JobsController(IJobRepository jobRepository)
        {
            this._jobRepository = jobRepository;

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var jobsToReturn = await _jobRepository.GetJobs();

            return Ok(jobsToReturn);
        }

        [Authorize]
        [HttpGet("{id}", Name="GetJob")]
        public async Task<IActionResult> GetJob(int id) {
            var jobToReturn = await _jobRepository.GetJob(id);

            return Ok(jobToReturn);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddJob(Job job) {


            var jobToReturn = await _jobRepository.Create(job);
            _jobRepository.Save();

            return CreatedAtRoute("GetJob", new {id = jobToReturn.Id}, jobToReturn);

        }

        [Authorize]
        [HttpGet("date/{date}")]
        public async Task<IActionResult> getJobWeek(DateTime date) {
            var jobsToReturn = await _jobRepository.GetJobsByWeek(date);

            return Ok(jobsToReturn);
        }
    }
}