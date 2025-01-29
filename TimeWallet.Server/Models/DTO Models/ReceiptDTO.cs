using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeWallet.Server.Models.DTO_Models
{
    public class ReceiptDTO
    {      
        public Guid id { get; set; }

       
        public string ShopId { get; set; }

       
        public byte[] ShopImage { get; set; }

       
        public DateTime DateTime { get; set; }

       
        public double TotalAmount { get; set; }

        
        public string UserId { get; set; }
    }
}
