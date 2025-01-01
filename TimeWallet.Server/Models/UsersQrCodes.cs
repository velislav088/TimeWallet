using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeWallet.Server.Models
{
    public class UsersQrCodes
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int QRCodeKey { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

    }
}
