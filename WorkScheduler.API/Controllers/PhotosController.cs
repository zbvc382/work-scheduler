using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WorkScheduler.API.Data;
using WorkScheduler.API.Dtos;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Controllers
{
    [AllowAnonymous]
    [Route("api/jobs/{jobId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IJobRepository _jobRepositoy;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IPhotoRepository _photoRepository;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IJobRepository jobRepositoy,
                                IMapper mapper,
                                IOptions<CloudinarySettings> cloudinaryConfig,
                                IPhotoRepository photoRepository)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _photoRepository = photoRepository;
            _mapper = mapper;
            _jobRepositoy = jobRepositoy;
            
            Account account = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _photoRepository.GetPhoto(id);

            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);

            if (photo != null)
            {
                return Ok(photoToReturn);
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto(int jobId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            var job = await _jobRepositoy.GetJobAsync(jobId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            job.Photos.Add(photo);

            if (await _jobRepositoy.SaveAsync()) {

                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                
                return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoToReturn);
            }

            return BadRequest();
        }
    }
}