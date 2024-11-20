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
using System.Diagnostics.Eventing.Reader;
using System.Reflection;
using System.Security.Claims;
using System.Text.Json;

namespace SecureWebSite.Server.Controllers
{
	[Route("api/securewebsite")]
	[ApiController]
	public class SecureWebsiteController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
	{
		private readonly SignInManager<User> signInManager = sm;
		private readonly UserManager<User> userManager = um;
		private ApplicationDbContext context = new ApplicationDbContext();

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

		
		//Баланса на сметката/user-a
		//test
		[HttpPost("checkBudget/{email}"), Authorize]
		public async Task<ActionResult> AddBudget(decimal Amount, string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			else
			{
				context.Users.FirstOrDefault(u => u==userInfo).Budget = Amount;
				context.SaveChanges();
				return Ok(new { message = "Successfuly added budget! " });
			}

		}

		//Добавяне на самата Колекция на елементите.
		[HttpPost("addBudget/{email}"), Authorize]
		public async Task<ActionResult> AddBudget(string email, [FromBody] BudgetAddDTO JsonCollection)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			else
			{
				//[{"id":"9844a411-7003-4336-9d65-e423fd560320","name":"asd","createdAt":1731788136212,"amount":564,"color":"34 65% 50%"}]

				List<string> UsersCollectionsNames = context.Budgets.Select(b => b.Name).ToList();

				if (UsersCollectionsNames.Contains(JsonCollection.Name))
				{
					return BadRequest(new { message = "There is already a collection named like this!" });
				}

				Budgets thToAdd = new Budgets()
				{
					id = JsonCollection.Id,
					Name = JsonCollection.Name,
					CreatedAt = DateTimeOffset
					.FromUnixTimeMilliseconds(JsonCollection.CreatedAt)
					.UtcDateTime,
					Amount = JsonCollection.Amount,
					UserId = userInfo.Id
				};
				

				context.Budgets.Add(thToAdd);
				context.SaveChanges();
				return Ok(new { message = $"Succesfully added new collection named -{JsonCollection.Name}-!" });

			}

		}

		//добавяне на елемент

		[HttpPost("addElement/{email}"), Authorize]
		public async Task<ActionResult> AddElement(ElementDTO JsonElement, string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}

			Budgets Budget = context
					.Budgets
					.FirstOrDefault(th => th.id == Guid.Parse(JsonElement.BudgetId));

			if (Budget != null)
			{
				Elements elementToAdd = new Elements()
				{
					id = Guid.Parse(JsonElement.Id),
					Name = JsonElement.Name,
					//Това id мога да го променя да го намира и по userId + CollectionName, ако ще ти е по удобно.
					BudgetId = Guid.Parse(JsonElement.BudgetId),
					Amount = JsonElement.Amount
				};
				context.Elements.Add(elementToAdd);
				context.SaveChanges();
				return Ok(new { message = $"Succesfully added new element named -{JsonElement.Name}-!" });
			}
			else
			{
				return BadRequest(new { message = $"Something went wrong, please try again.(No Budget with name:'{JsonElement.Name}' exists)" });
			}

		}

		[HttpDelete("deleteElement/{email}"), Authorize]
		public async Task<ActionResult> DeleteElement(string email, [FromBody] string id)
		{
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
			if(context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id)) == null)

            {
				return BadRequest(new { message = "No element with the given parameters exists!"});
			}
			else
			{
				Elements elementToRemove = context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id));
                context.Elements.Remove(elementToRemove);
				context.SaveChanges();
				return Ok(new { message = $"Element named:{elementToRemove.Name} is successfuly deleted!"});
            }			
        }

		[HttpDelete("deleteBudget/{email}"), Authorize]
		public async Task<ActionResult> DeleteBudget(string email, [FromBody] string id)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			if (context.Budgets.FirstOrDefault(b => b.id == Guid.Parse(id)) == null)
			{
				return BadRequest(new { message = $"User({userInfo.Name}) doesn't own the provided budget!" });
			}
			else
			{
				Budgets budgetToRemove = context.Budgets.FirstOrDefault(b => b.id == Guid.Parse(id));
				context.Budgets.Remove(budgetToRemove);
				context.SaveChanges();
				return Ok(new { message = $"Budget named:{budgetToRemove.Name} is successfuly removed!" });
			}

		}

		[HttpGet("getInformationAboutUser/{email}"), Authorize]
		public async Task<ActionResult> GetInformationAboutUser(string email)
		{
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
			string budgetJson = JsonSerializer.Serialize(context.Budgets.Where(b => b.UserId == userInfo.Id));
			string elementJson = JsonSerializer.Serialize(context.Elements.Where(e => e.Budgets.UserId == userInfo.Id));

			return Ok(new {budgetJson = budgetJson, elementJson = elementJson });
        }



    }
}
