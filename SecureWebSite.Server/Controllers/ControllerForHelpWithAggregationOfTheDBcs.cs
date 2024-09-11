using SecureWebSite.Server.Data;
using SecureWebSite.Server.Models;

namespace SecureWebSite.Server.Controllers
{
    public class ControllerForHelpWithAggregationOfTheDBcs
    {
        private ApplicationDbContext _context = new ApplicationDbContext();
       
        //User
        public User GetUserByID(string id)
        {
          
            if(id == null)
            {
                throw new ArgumentNullException("id");
            }
            if(_context.Users.FirstOrDefault(u => u.Id == id) != null)
            {
                return _context.Users.FirstOrDefault(u => u.Id == id);
            }
            else
            {
                throw new ArgumentException($"there is no such a user with id:{id} in the DataBase");
            }
        
        }

        public User GetUserByName(string name)
        {
           
            if (name == null)
            {
                throw new ArgumentNullException("name");
            }
            if (_context.Users.FirstOrDefault(u => u.Name == name) != null)
            {
                return _context.Users.FirstOrDefault(u => u.Name == name);
            }
            else
            {
                throw new ArgumentException($"there is no such a user with name:{name} in the DataBase");
            }
        }

        public User GetUserByEmailCapitals(string email)
        {
            if (email == null)
            {
                throw new ArgumentNullException("email");
            }
            if (_context.Users.FirstOrDefault(u => u.NormalizedEmail == email) != null)
            {
                return _context.Users.FirstOrDefault(u => u.NormalizedEmail == email);
            }
            else
            {
                throw new ArgumentException($"there is no such a user with email:{email} in the DataBase");
            }
        }


        //Account
        public Accounts GetAccountByID(int id)
        {
            if (id == null)
            {
                throw new ArgumentNullException("id");
            }
            if (_context.Accounts.FirstOrDefault(a => a.id == id) != null)
            {
                return _context.Accounts.FirstOrDefault(a => a.id == id);
            }
            else
            {
                throw new ArgumentException($"there is no such a user with id:{id} in the DataBase");
            }
        }

        public Accounts GetAccountByName(string name)
        {
            if (name == null)
            {
                throw new ArgumentNullException("name");
            }
            if (_context.Users.FirstOrDefault(a => a.Name == name) != null)
            {
                return _context.Accounts.FirstOrDefault(a => a.Name == name);
            }
            else
            {
                throw new ArgumentException($"there is no such an account with name:{name} in the DataBase");
            }
        }
        
    }
}
