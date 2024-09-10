using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SecureWebSite.Server.Models
{
    public class Payments
    {

        [Key]
        [Required]
        public int id { get; set; }

        [Required]
        [ForeignKey(nameof(PaymentHistory))]
        public int PaymentHistoryId { get; set; }
        public PaymentsHistories PaymentHistory { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal MoneySpend { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [MaxLength(Common.Common.Interceptor_OR_CameFrom_Name_Length)]
        public string SpendTo { get; set; }

    }
}
