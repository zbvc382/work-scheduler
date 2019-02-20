using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Data;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;

        public ValuesController(DataContext context)
        {
            this.context = context;

        }
        [AllowAnonymous]
        [HttpGet("{id}", Name="getValues")]
        public IActionResult getValues(int id)
        {
            var jobToReturn = context.Jobs.FirstOrDefault(j => j.Id == id);
            return Ok(jobToReturn);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult createJob([FromBody] Job job)
        {
           
            context.Jobs.Add(job);
            context.SaveChanges();
            return CreatedAtRoute("getValues", new {job.Id}, job);
        }

    }
}