using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeWallet.Server.Models
{
    public class Elements
    {

        [Key]
        [Required]
        public Guid id { get; set; }

        [ForeignKey(nameof(Budgets))]
        [Required]
        public Guid BudgetId { get; set; }
        public Budgets Budgets { get; set; }

        [Required]
        [MaxLength(Common.Common.UserName_Name_Length)]
        public string Name { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal Amount { get; set; }

        [Required]
        public DateTime CreatedAt = DateTime.Now;
    }
}
