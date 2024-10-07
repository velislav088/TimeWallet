using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SecureWebSite.Server.Models.Enums;

namespace SecureWebSite.Server.Models.DTO_Models
{
    public class ElementAddDTO
    {
       public int CollectionId { get; set; }
       public string Name { get; set; }
       public decimal Price { get; set; }
       public TypeOfTransaction TypeOfTransaction { get; set; }
    }
}
