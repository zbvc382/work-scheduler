using System.Linq;
using AutoMapper;
using WorkScheduler.API.Dtos;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<JobToCreateDto, Job>();
            CreateMap<Agency, AgencyToReturnDto>();
            CreateMap<Tag, TagToReturnDto>();
            CreateMap<Job, JobToReturnDto>().ForMember(dest => dest.Tags, opt => {
                opt.MapFrom(src => src.JobTags.Select(x => x.Tag).ToList());
            });
        }
    }
}