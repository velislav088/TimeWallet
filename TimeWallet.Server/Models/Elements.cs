﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeWallet.Server.Models
{
    public class Elements
    {

        [Key]
        [Required]
        public Guid id { get; set; }

        [ForeignKey(nameof(budgets))]
        [Required]
        public Guid budgetId { get; set; }
        public Budgets budgets { get; set; }

        [Required]
        [MaxLength(Common.Common.UserName_Name_Length)]
        public string name { get; set; }

        [Required]
        [Range(Common.Common.Moneys_Min_Length, Common.Common.Moneys_Max_Length)]
        public decimal amount { get; set; }

        [Required]
        public string createdAt { get; set; }
    }
}
