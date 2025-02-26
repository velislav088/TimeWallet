using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TimeWallet.Server.Models.DTO_Models
{
    public class ElementDTO
    {    
       public Guid id { get; set; }
       public string name { get; set; }
       public string createdAt { get; set; }
       public decimal amount { get; set; }
       public string budgetId { get; set; }
        //isValid() func - Приложи
        public int? ReceiptId { get; set; }
    }
}
