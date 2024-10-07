using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureWebSite.Server.Data;
using SecureWebSite.Server.Models;
using SecureWebSite.Server.Models.DTO_Models;
using SecureWebSite.Server.Models.NewFolder1;
using System.Collections;
using System.Security.Claims;

namespace SecureWebSite.Server.Controllers
{
	[Route("api/securewebsite")]
	[ApiController]
	public class SecureWebsiteController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
	{
		private readonly SignInManager<User> signInManager = sm;
		private readonly UserManager<User> userManager = um;
		private ApplicationDbContext context;

		[HttpPost("register")]
		public async Task<ActionResult> RegisterUser(User user)
		{

			IdentityResult result = new();

			try
			{
				User user_ = new User()
				{
					Name = user.Name,
					Email = user.Email,
					UserName = user.UserName,
				};

				result = await userManager.CreateAsync(user_, user.PasswordHash);

				if (!result.Succeeded)
				{
					return BadRequest(result);
				}
			}
			catch (Exception ex)
			{
				return BadRequest("Something went wrong, please try again. " + ex.Message);
			}

			return Ok(new { message = "Registered Successfully.", result = result });
		}

		[HttpPost("login")]
		public async Task<ActionResult> LoginUser(Login login)
		{

			try
			{
				User user_ = await userManager.FindByEmailAsync(login.Email);
				if (user_ != null)
				{
					login.Username = user_.UserName;

					if (!user_.EmailConfirmed)
					{
						user_.EmailConfirmed = true;
					}

					var result = await signInManager.PasswordSignInAsync(user_, login.Password, login.Remember, false);

					if (!result.Succeeded)
					{
						return Unauthorized(new { message = "Check your login credentials and try again" });
					}

					user_.LastLogin = DateTime.Now;
					var updateResult = await userManager.UpdateAsync(user_);
				}
				else
				{
					return BadRequest(new { message = "Please check your credentials and try again. " });
				}
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = "Something went wrong, please try again. " + ex.Message });
			}

			return Ok(new { message = "Login Successful." });
		}

		[HttpGet("logout"), Authorize]
		public async Task<ActionResult> LogoutUser()
		{

			try
			{
				await signInManager.SignOutAsync();
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = "Someting went wrong, please try again. " + ex.Message });
			}

			return Ok(new { message = "You are free to go!" });
		}

		//[HttpGet("admin"), Authorize]
		//public ActionResult AdminPage(){
		//		string[] partners = { "Raja", "Bill Gates", "Elon Musk", "Taylor Swift", "Jeff Bezoss",
		//						"Mark Zuckerberg", "Joe Biden", "Putin"};

		//		return Ok(new { trustedPartners = partners });
		//}

		[HttpGet("home/{email}"), Authorize]
		public async Task<ActionResult> HomePage(string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}

			return Ok(new { userInfo = userInfo });
		}

		[HttpGet("xhtlekd")]
		public async Task<ActionResult> CheckUser()
		{
			User currentuser = new();

			try
			{
				var user_ = HttpContext.User;
				var principals = new ClaimsPrincipal(user_);
				var result = signInManager.IsSignedIn(principals);
				if (result)
				{
					currentuser = await signInManager.UserManager.GetUserAsync(principals);
				}
				else
				{
					return Forbid();
				}
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = "Something went wrong please try again. " + ex.Message });
			}

			return Ok(new { message = "Logged in", user = currentuser });
		}

		[HttpPost("addBudget/{email}"), Authorize]
		public async Task<ActionResult> AddBudget(BudgetAddDTO budget, string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			else
			{
				userInfo.Budget = budget.BudgetAmount;
				return Ok(new { message = "Successfuly added budget! " });
			}

		}

		[HttpPost("addTransaction/{email}"), Authorize]
		public async Task<ActionResult> AddTransaction(string email, string CollectionName)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			else
			{
				List<string> UsersCollectionsNames = new List<string>();
				foreach(var col in context.TransactionsHistories)
				{
					if (col.Title == CollectionName && context.TransactionsHistories.FirstOrDefault(th => th.Title == col.Title) != null)
					{
				      UsersCollectionsNames.Add(col.Title);						
					}
				}

				if (UsersCollectionsNames.Contains(CollectionName))
				{
					return BadRequest(new { message = "There is already a collection named like this!" });
				}

				TransactionsHistories thToAdd = new TransactionsHistories()
				{
					Title = CollectionName,
					UserId = userInfo.Id
				};

				context.TransactionsHistories.Add(thToAdd);
				return Ok(new { message = $"Succesfully added new collection named -{CollectionName}-!" });

			}

		}

		[HttpPost("addElement/{email}"), Authorize]
		public async Task<ActionResult> AddElement(string email, ElementAddDTO element)
		{
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
			if(context.TransactionsHistories.FirstOrDefault(th => th.id == element.CollectionId) != null)
			{
				Elements elementToAdd = new Elements()
				{
					Name = element.Name,
					TransactionHistoriesId = element.CollectionId,
					Price = element.Price,
					TypeOfTransaction = element.TypeOfTransaction
				};
				context.Elements.Add(elementToAdd);
				return Ok(new { message = $"Succesfully added new element named -{element.Name}-!" });
            }
			else
			{
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
			
        }

		[HttpGet("getTransactionHistroy/{email}"), Authorize]
		public async Task<ActionResult> GetTransactionHistory(string email)
		{
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
			if (context.TransactionsHistories.FirstOrDefault(th => th.UserId == userInfo.Id) == null)
			{
                return BadRequest(new { message = "There users has no transactions made!" });
            }
			else
			{
				return Ok(new
				{
					message = "Operation succesfully made!",
					UsersTransactions = context
					.Elements
					.Where(e => e.TransactionHistories.UserId == userInfo.Id)

				}); ;
            }
			
        }




	} 
}
