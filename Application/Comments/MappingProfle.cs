using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfle : Profile
    {
        public MappingProfle()
        {
            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.UserName, o => o.MapFrom(x => x.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(x => x.Author.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(x => x.Author.Photos.FirstOrDefault(s =>s.IsMain).Url));
        }
    }
}