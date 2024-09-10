using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SecureWebSite.Server.Models
{
    public class TransactionsHistories
    {

        [Key]
        [Required]
        public int id { get; set; }

        [Required]
        [ForeignKey(nameof(Accounts))]
        public int AccountId { get; set; }
        public Accounts Accounts { get; set; }

        [MaxLength(Common.Common.Title_Max_Length)]
        [Required]
        public string Title { get; set; }

        [MaxLength(Common.Common.Interceptor_OR_CameFrom_Name_Length)]
        [Required]
        public string To { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal Balance { get; set; }

        [Required]
        public DateTime TransactionMadeDate { get; set; }

    }
}
