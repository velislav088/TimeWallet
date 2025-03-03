using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeWallet.Server.Models
{
    public class UsersReceipts
    {
        [Key]
        [Required]
        public string id { get; set; }

        [Required]
        public string ShopId { get; set; }

        [Required]
        public byte[] ShopImage { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length_Receipts)]
        public double TotalAmount { get; set; }

        [ForeignKey(nameof(user))]
        public string UserId { get; set; }
        public User user { get; set; }
    }
}
