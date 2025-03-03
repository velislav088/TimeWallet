using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace TimeWallet.Server.Models
{
    public class User : IdentityUser
    {

        [MaxLength(50)]
        public string Name { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime LastLogin { get; set; } = DateTime.Now;

        public string Theme { get; set; } = "light";

        public string Language { get; set; } = "en";
    }
}
