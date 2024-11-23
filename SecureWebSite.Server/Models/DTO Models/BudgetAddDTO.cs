namespace TimeWallet.Server.Models.NewFolder1
{
    public class BudgetAddDTO
    {
        //[{"id":"9844a411-7003-4336-9d65-e423fd560320","name":"asd","createdAt":1731788136212,"amount":564,"color":"34 65% 50%"}]
       public Guid Id { get; set; }
       public string Name { get; set; }
       public long CreatedAt { get; set; }
       public decimal Amount { get; set; }
    }
}
