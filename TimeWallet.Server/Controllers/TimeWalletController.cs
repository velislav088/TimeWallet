using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeWallet.Server.Data;
using TimeWallet.Server.Models;
using TimeWallet.Server.Models.DTO_Models;
using TimeWallet.Server.Models.NewFolder1;
using TimeWallet.Server.Data;
using TimeWallet.Server.Models;
using TimeWallet.Server.Models.DTO_Models;
using TimeWallet.Server.Models.NewFolder1;
using System.Collections;
using System.Diagnostics.Eventing.Reader;
using System.Reflection;
using System.Security.Claims;
using System.Text.Json;
using System.Runtime.CompilerServices;



namespace TimeWallet.Server.Controllers
{
	[Route("api/timewallet")]
	[ApiController]
	public class TimeWalletController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
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
				return BadRequest("Нещо се обърка, моля пробвайте пак. " + ex.Message);
			}

			return Ok(new { message = "Успешно регистриране.", result = result });
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
						return Unauthorized(new { message = "Невалидно потребителско име или парола" });
					}

					user_.LastLogin = DateTime.Now;
					var updateResult = await userManager.UpdateAsync(user_);
				}
				else
				{
					return BadRequest(new { message = "Невалидно потребителско име или парола. " });
				}
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак. " + ex.Message });
			}

			return Ok(new { message = "Успешно влизане." });
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
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак. " + ex.Message });
			}

			return Ok(new { message = "Свободни сте!" });
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
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
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
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак. " + ex.Message });
			}

			return Ok(new { message = "Влязъл", user = currentuser });
		}


		////Баланса на сметката/user-a
		////test
		//[HttpPost("checkBudget/{email}"), Authorize]
		//public async Task<ActionResult> AddBudget(decimal Amount, string email)
		//{
		//	User userInfo = await userManager.FindByEmailAsync(email);
		//	if (userInfo == null)
		//	{
		//		return BadRequest(new { message = "Something went wrong, please try again." });
		//	}
		//	else
		//	{
		//		context.Users.FirstOrDefault(u => u==userInfo).Budget = Amount;
		//		context.SaveChanges();
		//		return Ok(new { message = "Successfuly added budget! " });
		//	}

		//}

		//Добавяне на самата Колекция на елементите.
		[HttpPost("addBudget/{email}"), Authorize]
		public async Task<ActionResult> AddBudget(string email, [FromBody] BudgetAddDTO JsonCollection)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
			}
			else
			{

				List<string> UsersCollectionsNames = context.Budgets.Select(b => b.Name).ToList();

				if (UsersCollectionsNames.Contains(JsonCollection.Name))
				{
					return BadRequest(new { message = $"{JsonCollection.Name} вече съществува!" });
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
				return Ok(new { message = $"Успешно създаване на бюджет -{JsonCollection.Name}-!" });

			}

		}

		//добавяне на елемент

		[HttpPost("addElement/{email}"), Authorize]
		public async Task<ActionResult> AddElement(ElementDTO JsonElement, string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
			}

			Budgets Budget = context
					.Budgets
					.FirstOrDefault(th => th.id == Guid.Parse(JsonElement.budgetId));
			long a = long.Parse(JsonElement.createdAt.ToString());
			string dateTimeConvertion = DateTimeOffset.FromUnixTimeMilliseconds(a).UtcDateTime.ToString("MM/dd/yyyy");


            if (Budget != null)
			{
						
				Elements elementToAdd = new Elements()
				{
					id = Guid.Parse(JsonElement.id),
					name = JsonElement.name,
					//Това id мога да го променя да го намира и по userId + CollectionName, ако ще ти е по удобно.
					budgetId = Guid.Parse(JsonElement.budgetId),
					amount = JsonElement.amount,
					createdAt = dateTimeConvertion
				};
                await Console.Out.WriteLineAsync();
                context.Elements.Add(elementToAdd);
				context.SaveChanges();
				return Ok(new { message = $"Успешно създаване на разход -{JsonElement.name}-!" });
			}
			else
			{
				return BadRequest(new { message = $"Нещо се обърка, моля пробвайте пак. (Няма бюджет с име:'{JsonElement.name}')" });
			}

		}

		[HttpDelete("deleteElement/{email}"), Authorize]
		public async Task<ActionResult> DeleteElement(string email, [FromBody] string id)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
			}
			if (context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id)) == null)

			{
				return BadRequest(new { message = "Разход с дадените параметри не съсществува!" });
			}
			else
			{
				Elements elementToRemove = context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id));
				context.Elements.Remove(elementToRemove);
				context.SaveChanges();
				return Ok(new { message = $"Разход:{elementToRemove.name} е успешно изтрит!" });
			}
		}

		[HttpDelete("deleteBudget/{email}"), Authorize]
		public async Task<ActionResult> DeleteBudget(string email, [FromBody] string id)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
			}
			if (context.Budgets.FirstOrDefault(b => b.id == Guid.Parse(id)) == null)
			{
				return BadRequest(new { message = $"Потребител({userInfo.Name}) не притежава дадения бюджет!" });
			}
			else
			{
				Budgets budgetToRemove = context.Budgets.FirstOrDefault(b => b.id == Guid.Parse(id));
				context.Budgets.Remove(budgetToRemove);
				context.SaveChanges();
				return Ok(new { message = $"Бюджет на име:{budgetToRemove.Name} е успешно изтрит!" });
			}

		}

		[HttpGet("getInformationAboutUser/{email}"), Authorize]
		public async Task<ActionResult> GetInformationAboutUser(string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
			}
			string budgetJSON = JsonSerializer.Serialize(context.Budgets.Where(b => b.UserId == userInfo.Id));
			string elementJSON = JsonSerializer.Serialize(context.Elements.Where(e => e.budgets.UserId == userInfo.Id));

			//Промяна в имената! - Не ти прече
			return Ok(new { budgetJson = budgetJSON, elementJson = elementJSON });
		}

		[HttpGet("getInformationAboutBudget/{email}"), Authorize]
		public async Task<ActionResult> GetInformationAboutBudget(string email, string id)
		{
			Guid GuidId = Guid.Parse(id);
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Нещо се обърка, моля пробвайте пак." });
            }
			Budgets budget = context.Budgets.FirstOrDefault(b => b.id == GuidId);
			if (budget == null)
			{
				return BadRequest(new { message = "Бюджета вече не съществува или никога не е съществувал!" });
			}
			else if(budget.UserId != userInfo.Id)
			{
				return BadRequest(new { message = "Този бюджет не принадлежи на потребителя" });  
				//TODO: this should notife us!
			}
			else
			{
				List<ElementGetDTO> elements = new List<ElementGetDTO>();
                foreach (var element in context.Elements.Where(e => e.budgetId == GuidId))
                {
					elements.Add(new ElementGetDTO()
					{
						id = element.id,
						name = element.name,
						amount = element.amount,
						createdAt = element.createdAt,
						budgetId = element.budgetId
					});
                }

				string elementsJSON = JsonSerializer.Serialize(elements);
				string budgetJSON = JsonSerializer.Serialize(budget);

				//Промяна в имената!!! - Пречи ти
                return Ok( new { budgetJSON = budgetJSON, elementsJSON = elementsJSON});
			}



        }



    }
}
