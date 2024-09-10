using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SecureWebSite.Server.Models;

namespace SecureWebSite.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public ApplicationDbContext()
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Accounts> Accounts { get; set; } = null!;
        public DbSet<ElementsI> ElementsI { get; set; } = null!;
        public DbSet<ElementsP> ElementsP { get; set; } = null!;
        public DbSet<Incomes> Incomes { get; set; } = null!;
        public DbSet<IncomesHistories> IncomeHistory { get; set; } = null!;
        public DbSet<Payments> Payments { get; set; } = null!;
        public DbSet<PaymentsHistories> PaymentHistories { get; set; } = null!;
        public DbSet<TransactionsHistories> TransactionHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-N2P1BBN\SQLEXPRESS;Database=FMA_TEST2;Integrated Security=True;TrustServerCertificate=True;");
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

        }
    }
}
