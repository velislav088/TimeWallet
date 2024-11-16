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
		[HttpPost("addBudget/{email}"), Authorize]
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
		[HttpPost("addTransaction/{email}"), Authorize]
		public async Task<ActionResult> AddTransaction(string email, [FromBody] CollectionAddDTO JsonCollection)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}
			else
			{
				//[{"id":"9844a411-7003-4336-9d65-e423fd560320","name":"asd","createdAt":1731788136212,"amount":564,"color":"34 65% 50%"}]
				//CollectionAddDTO collectionDTO = JsonSerializer.Deserialize<CollectionAddDTO>(JsonCollection);


				List<string> UsersCollectionsNames = new List<string>();
				foreach (var col in context.TransactionsHistories)
				{
					if (col.Title == JsonCollection.Name && context.TransactionsHistories.FirstOrDefault(th => th.Title == col.Title) != null)
					{
						UsersCollectionsNames.Add(col.Title);
					}
				}

				if (UsersCollectionsNames.Contains(JsonCollection.Name))
				{
					return BadRequest(new { message = "There is already a collection named like this!" });
				}

				TransactionsHistories thToAdd = new TransactionsHistories()
				{
					id = JsonCollection.Id,
					Title = JsonCollection.Name,
					UserId = userInfo.Id
				};

				context.TransactionsHistories.Add(thToAdd);
				context.SaveChanges();
				return Ok(new { message = $"Succesfully added new collection named -{JsonCollection.Name}-!" });

			}

		}

		//добавяне на елемент

		[HttpPost("addElement/{email}"), Authorize]
		public async Task<ActionResult> AddElement(string JsonElement, string email)
		{
			User userInfo = await userManager.FindByEmailAsync(email);
			if (userInfo == null)
			{
				return BadRequest(new { message = "Something went wrong, please try again." });
			}

			ElementAddDTO elementDTO = JsonSerializer.Deserialize<ElementAddDTO>(JsonElement);

			TransactionsHistories transactionsHistories = context
					.TransactionsHistories
					.FirstOrDefault(th => th.id == elementDTO.BudgetId);

			if (transactionsHistories != null)
			{
				Elements elementToAdd = new Elements()
				{
					id = elementDTO.Id,
					Name = elementDTO.Name,
					//Това id мога да го променя да го намира и по userId + CollectionName, ако ще ти е по удобно.
					TransactionHistoriesId = elementDTO.BudgetId,
					Price = elementDTO.Amount
				};
				context.Elements.Add(elementToAdd);
				context.SaveChanges();

				//if (elementToAdd.TypeOfTransaction == Models.Enums.TypeOfTransaction.outcome)
				//{
				//	transactionsHistories.SumOfElements -= elementToAdd.Price;
				//}
				//else if (elementToAdd.TypeOfTransaction == Models.Enums.TypeOfTransaction.income)
				//{
				//	transactionsHistories.SumOfElements += elementToAdd.Price;
				//}
				//else
				//{
				//	return BadRequest(new { message = $"None valid type of 'TypeOfTransaction' is presented in Element with id: {elementToAdd.id}" });
				//}


				return Ok(new { message = $"Succesfully added new element named -{elementDTO.Name}-!" });
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

		//In Process of making...

		//[HttpPost("editElement/{email}"), Authorize]  
		//public async Task<ActionResult> EditAnChosenElement(string email, ElementEditDTO element)
		//{
		//          User userInfo = await userManager.FindByEmailAsync(email);
		//          if (userInfo == null)
		//          {
		//              return BadRequest(new { message = "Something went wrong, please try again." });
		//          }
		//	Elements ElementToEdit = context.Elements.FirstOrDefault(e => e.id == element.Id);
		//	List<Elements> TheElementsThatBelongsToTheSpecificUser = context
		//		.Elements
		//		.Where(e => e.TransactionHistories.UserId == userInfo.Id)
		//		.ToList();
		//	if(ElementToEdit != null 
		//		&& TheElementsThatBelongsToTheSpecificUser.Any(e => e.id == element.Id))
		//          {
		//		if(element.EditableThingsInTheElementsClass
		//			== Models.Enums.EditableThingsInTheElementsClass.Price)
		//		{
		//			//ElementToEdit.Price =
		//		}
		//	}
		//	return Ok(ElementToEdit);
		//      }

	}
}
