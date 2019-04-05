using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkScheduler.API.Data;
using WorkScheduler.API.Dtos;

namespace WorkScheduler.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AppliancesController: ControllerBase
    {
        private readonly IApplianceTypeRepository _applianceTypesRepository;
        private readonly IMapper _mapper;

        public AppliancesController(IApplianceTypeRepository applianceTypesRepository, IMapper mapper)
        {
            _applianceTypesRepository = applianceTypesRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetApplianceTypes()
        {
            var applianceTypes = await _applianceTypesRepository.GetApplianceTypes();
            var appliancesToReturn = _mapper.Map<List<AppliancesForReturn>>(applianceTypes);

            return Ok(appliancesToReturn);
        }
    }
}