using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SecureWebSite.Server.Models
{
    public class Accounts
    {
        [Key]
        [Required]
        public int id { get; set; }

        [Required]
        [MaxLength(Common.Common.UserName_Name_Length)]
        public string Name { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length_Acc_Full_Balance)]
        public decimal Ballance { get; set; }


        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal MonthlyIncome { get; set; }

        public DateTime LastTimeLogin { get; set; } = DateTime.Now;

        [Required]
        [ForeignKey(nameof(users))]
        [MaxLength(450)]
        public string UserId { get; set; }
        public User users { get; set; }

    }
}
