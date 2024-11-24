using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TimeWallet.Server.Models.DTO_Models
{
    public class ElementDTO
    {    
       public string Id { get; set; }
       public string Name { get; set; }
       public long CreatedAt { get; set; }
       public decimal Amount { get; set; }
       public string BudgetId { get; set; }
    }
}
