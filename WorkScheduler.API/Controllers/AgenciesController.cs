using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkScheduler.API.Data;

namespace WorkScheduler.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AgenciesController : ControllerBase
    {
        private readonly IAgencyRpository _agencyRpository;

        public AgenciesController(IAgencyRpository agencyRpository)
        {
            this._agencyRpository = agencyRpository;
        }

        [HttpGet]
        public async Task<IActionResult> getAgencies() {
            var agenciesToReturn = await _agencyRpository.getAllAgencies();

            return Ok(agenciesToReturn);
        }
    }
}