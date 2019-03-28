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
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<JobForCreationDto, Job>();
            CreateMap<Agency, AgencyForReturnDto>();
            CreateMap<Tag, TagForReturnDto>();
            CreateMap<ExtraJobForReturn, Job>();
            CreateMap<AppliancesForReturn, ApplianceType>();
            CreateMap<Job, JobForReturnDto>().ForMember(dest => dest.Tags, opt => {
                opt.MapFrom(src => src.JobTags.Select(x => x.Tag).ToList());
            });
        }
    }
}