﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeWallet.Server.Models
{
    public class Receipts
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public int ShopId { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length_Receipts)]
        public double TotalAmount { get; set; }

        [Required]
        public string UserId { get; set; }  

        [Required]
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

    }
}
