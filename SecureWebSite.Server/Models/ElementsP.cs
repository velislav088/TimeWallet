using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SecureWebSite.Server.Models
{
    public class ElementsP
    {
        [Key]
        [Required]
        public int id { get; set; }

        [ForeignKey(nameof(Payment))]
        [Required]
        public int PaymentId { get; set; }
        public Payments Payment { get; set; }

        [Required]
        [MaxLength(Common.Common.UserName_Name_Length)]
        public string Name { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal Price { get; set; }
    }
}
