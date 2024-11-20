using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeWallet.Server.Models
{
    public class Budgets
    {

        [Key]
        [Required]
        public Guid id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User User { get; set; }

        [MaxLength(Common.Common.Title_Max_Length)]
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime CreatedAt = DateTime.Now;

        //sum of all elementsProperty

        [Required]
        public decimal Amount { get; set; }
    }
}
