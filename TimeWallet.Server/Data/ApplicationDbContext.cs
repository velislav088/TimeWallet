using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TimeWallet.Server.Models;

namespace TimeWallet.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public ApplicationDbContext()
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Elements> Elements { get; set; } = null!;
        public DbSet<Budgets> Budgets { get; set; } = null!;
        public DbSet<Receipts> Receipts { get; set; } = null!;
        public DbSet<ReceiptItems> ReceiptItems { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Server=tcp:timewalletdbserver.database.windows.net,1433;Initial Catalog=TimeWalletDB;Persist Security Info=False;User ID=TimeWallet;Password=Aposiopeza...;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=TrueWalletDB;Trusted_Connection=True;TrustServerCertificate=True;");
                
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Budgets>()
            .Property(b => b.CreatedAt)
            .HasDefaultValueSql("GETDATE()");

        }
    }
}
