namespace TimeWallet.Server.Models.DTO_Models
{
    public class UsersReceiptsDTO
    {
        public string id { get; set; }
        public string ShopId { get; set; }
        public byte[] ShopImage { get; set; }
        public DateTime DateTime { get; set; }
        public double TotalAmount { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
