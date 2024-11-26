namespace TimeWallet.Server.Models.DTO_Models
{
    public class ElementGetDTO
    {   
        public Guid id { get; set; } 
        public string name { get; set; }

        //Това сигурно не ти трябва?
        public Guid budgetId { get; set; }
        
        //Би трябвало да го конвертираш в DateTime!
        public string createdAt { get; set; }
        public decimal amount { get; set; }

    }
}
