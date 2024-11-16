using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SecureWebSite.Server.Models.Enums;

namespace SecureWebSite.Server.Models.DTO_Models
{
    public class ElementAddDTO
    {
        //[{"id":"0037b678-b06c-44d7-b3eb-8d8812727be6","name":"asd123","createdAt":1731791383496,"amount":53,"budgetId":"50b321c3-299e-4cd1-9ee5-6461c244df51"}]
       public string Id { get; set; }
       public string Name { get; set; }
       public long CreatedAt { get; set; }
       public decimal Amount { get; set; }
       public string BudgetId { get; set; }
    }
}
