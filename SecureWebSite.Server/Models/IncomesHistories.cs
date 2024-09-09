using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SecureWebSite.Server.Models
{
    public class IncomesHistories
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

    }
}
