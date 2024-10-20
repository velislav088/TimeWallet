using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SecureWebSite.Server.Models.Enums;

namespace SecureWebSite.Server.Models
{
    public class Elements
    {
        
        [Key]
        [Required]
        public int id { get; set; }

        [ForeignKey(nameof(TransactionHistories))]
        [Required]
        public int TransactionHistoriesId { get; set; }
        public TransactionsHistories TransactionHistories { get; set; }

        [Required]
        [MaxLength(Common.Common.UserName_Name_Length)]
        public string Name { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal Price { get; set; }

        [Required]
        public DateTime Created = DateTime.Now;

        [Required]
        public TypeOfTransaction TypeOfTransaction { get; set; }
    }
}
