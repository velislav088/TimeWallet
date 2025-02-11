using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TimeWallet.Server.Models.Common;

namespace TimeWallet.Server.Models
{
    public class ReceiptItems
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [MaxLength(Common.Common.Title_Max_Length)]
        public string Name { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public double Amount { get; set; }

        [Required]
        public int ReceiptId { get; set; }

        [Required]
        [ForeignKey(nameof(ReceiptId))]
        public Receipts Receipts { get; set; }
    
    }
}
