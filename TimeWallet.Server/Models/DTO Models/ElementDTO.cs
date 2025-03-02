using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TimeWallet.Server.Models.DTO_Models
{
    public class ElementDTO
    {    
       public Guid id { get; set; }
       public string name { get; set; }
       public long createdAt { get; set; }
       public decimal amount { get; set; }
       public Guid budgetId { get; set; }
        //isValid() func - Приложи
       public string? ReceiptId { get; set; }
    }
}
