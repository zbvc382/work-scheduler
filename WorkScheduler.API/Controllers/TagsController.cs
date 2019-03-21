using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Data;
using WorkScheduler.API.Dtos;

namespace WorkScheduler.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public TagsController(DataContext dataContext, IMapper mapper)
        {
            this._dataContext = dataContext;
            this._mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> getTags() {
            var tags = await _dataContext.Tags.ToListAsync();
            var tagsToReturn = _mapper.Map<List<TagForReturnDto>>(tags);

            return Ok(tagsToReturn);
        }
    }
}