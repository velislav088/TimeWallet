using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TimeWallet.Server.Models.DTO_Models
{
    public class ElementDTO
    {    
       public string id { get; set; }
       public string name { get; set; }
       public long createdAt { get; set; }
       public decimal amount { get; set; }
       public string budgetId { get; set; }
    }
}
