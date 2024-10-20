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
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User User { get; set; }

        [MaxLength(Common.Common.Title_Max_Length)]
        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Created = DateTime.Now;

        public decimal SumOfElements = 0;

        
    }
}
