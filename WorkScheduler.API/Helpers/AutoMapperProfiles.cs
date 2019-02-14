using AutoMapper;
using WorkScheduler.API.Dtos;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForLoginDto>();
        }
    }
}