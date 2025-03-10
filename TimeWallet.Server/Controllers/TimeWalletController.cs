﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;
using TimeWallet.Server.Data;
using TimeWallet.Server.Models;
using TimeWallet.Server.Models.DTO_Models;
using TimeWallet.Server.Models.NewFolder1;



namespace TimeWallet.Server.Controllers
{
    [Route("api/timewallet")]
    [ApiController]
    public class TimeWalletController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
    {
        private readonly SignInManager<User> signInManager = sm;
        private readonly UserManager<User> userManager = um;
        private ApplicationDbContext context = new ApplicationDbContext();


        //Регистриране на потребител.
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


        //Влизане в профил
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


        //Регистриране на потребител.



        ////Тестов рекуест!
        //[HttpGet("xhtlekd")]
        //public async Task<ActionResult> CheckUser( )
        //{
        //              User userInfo = await userManager.FindByEmailAsync(email);
        //              if (userInfo == null)
        //              {
        //                  return BadRequest(new { message = "Something went wrong, please try again." });
        //              }

        //              try
        //	    {
        //		var user_ = HttpContext.User;
        //		var principals = new ClaimsPrincipal(user_);
        //		var result = signInManager.IsSignedIn(principals);
        //		if (result)
        //		{
        //			userInfo = await signInManager.UserManager.GetUserAsync(principals);
        //		}
        //		else
        //		{
        //			return Forbid();
        //		}
        //	}
        //	catch (Exception ex)
        //	{
        //		return BadRequest(new { message = "Something went wrong please try again. " + ex.Message });
        //	}

        //	return Ok(new { message = "Logged in", user = currentuser });
        //}



        //Добавяне на самата колекция(Budgets) на елементите.
        [HttpPost("addBudget/{email}")]
        public async Task<ActionResult> AddBudget(string email, [FromBody] BudgetAddDTO JsonCollection)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            else
            {

                List<string> UsersCollectionsNames = context.Budgets.Select(b => b.Name).ToList();

                if (UsersCollectionsNames.Contains(JsonCollection.Name))
                {
                    return BadRequest(new { message = $"{JsonCollection.Name} already exists!" });
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

        [HttpPost("addElement/{email}")]
        public async Task<ActionResult> AddElement(ElementDTO JsonElement, string email)
        {
            Console.WriteLine($"Received request: {JsonElement.name}, BudgetId: {JsonElement.budgetId}");

            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            //if (!Guid.TryParse(JsonElement.budgetId, out Guid budgetGuid))
            //{
            //    return BadRequest(new { message = "Invalid budget ID." });
            //}

            //Budgets Budget = context.Budgets.FirstOrDefault(th => th.id == Guid.Parse(budgetGuid));
            //if (Budget == null)
            //{
            //    return BadRequest(new { message = $"No budget found with ID: '{JsonElement.budgetId}'." });
            //}

            //if (!long.TryParse(JsonElement.createdAt.ToString(), out long timestamp))
            //{
            //    return BadRequest(new { message = "Invalid date format." });
            //}

            //string dateTimeConvertion = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).UtcDateTime.ToString("MM/dd/yyyy")

            Elements elementToAdd = new Elements()
            {
                id = JsonElement.id,
                name = JsonElement.name,
                budgetId = JsonElement.budgetId,
                amount = JsonElement.amount,
                createdAt = JsonElement.createdAt,
                ReceiptId = JsonElement.ReceiptId
            };

            context.Elements.Add(elementToAdd);
            context.SaveChanges();

            return Ok(new { message = $"Successfully added new element named -{JsonElement.name}-!" });
        }



        //Изтриване на елемент(Expense)
        [HttpDelete("deleteElement/{email}")]
        public async Task<ActionResult> DeleteElement(string email, [FromBody] string id)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            if (context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id)) == null)

            {
                return BadRequest(new { message = "No element with the given parameters exists!" });
            }
            else
            {
                Elements elementToRemove = context.Elements.FirstOrDefault(e => e.id == Guid.Parse(id));
                context.Elements.Remove(elementToRemove);
                context.SaveChanges();
                return Ok(new { message = $"Element named:{elementToRemove.name} is successfuly deleted!" });
            }
        }


        //Изтриване на колекция()
        [HttpDelete("deleteBudget/{email}")]
        public async Task<ActionResult> DeleteBudget(string email, [FromBody] string id)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            if (context.Budgets.Where(b => b.UserId == userInfo.Id).FirstOrDefault(b => b.id == Guid.Parse(id)) == null)
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


        //TO DO
        [HttpGet("getInformationAboutUser/{email}")]
        public async Task<ActionResult> GetInformationAboutUser(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            string budgetJSON = JsonSerializer.Serialize(context.Budgets.Where(b => b.UserId == userInfo.Id).ToList());
            var elements = context.Elements
            .Include(e => e.budgets)
            .Where(e => e.budgets != null && e.budgets.UserId == userInfo.Id)
            .Select(e => new
            {
                e.id,
                e.name,
                e.budgetId,
                e.amount,
                e.createdAt,
                e.ReceiptId
            })
            .ToList();

            string elementJSON = JsonSerializer.Serialize(elements);



            //Промяна в имената! - Не ти прече
            return Ok(new { budgetJson = budgetJSON, elementJson = elementJSON });
        }



        [HttpGet("getInformationAboutBudget/{email}")]
        public async Task<ActionResult> GetInformationAboutBudget(string email, string id)
        {
            Guid GuidId = Guid.Parse(id);
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            Budgets budget = context.Budgets.FirstOrDefault(b => b.id == GuidId);
            if (budget == null)
            {
                return BadRequest(new { message = "This budget doesn't exist anymore or never existed!" });
            }
            else if (budget.UserId != userInfo.Id)
            {
                return BadRequest(new { message = "This budget doesn't belong to this user! How did you got it!?" });
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
                return Ok(new { budgetJSON = budgetJSON, elementsJSON = elementsJSON });
            }



        }

        [HttpPost("addReceipt/{email}")]
        public async Task<ActionResult> AddReceipt(string email, ReceiptDTO receipt)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            else
            {
                Receipts receiptToAdd = new Receipts()
                {
                    createdAt = receipt.createdAt,
                    ShopId = receipt.ShopId.ToString(),
                    ShopImage = receipt.ShopImage,
                    TotalAmount = receipt.TotalAmount,
                    //UserId = receipt.UserId,
                };

                context.Receipts.Add(receiptToAdd);
                context.SaveChanges();
                return Ok(new { message = "New receipt is succesfully added!" });
            }

        }





        //Излизане от профил
        [HttpGet("logout")]
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

        //Начална страница
        [HttpGet("home/{email}")]
        public async Task<ActionResult> HomePage(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }

            return Ok(new { userInfo = userInfo });
        }


        //Тестов рекуест!
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


        [HttpPost("removeReceipt/{email}")]
        public async Task<ActionResult> RemoveReceipt(string email, string receiptId)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            //TO DO: if the receiptId is not valid Guid!\
            context.Receipts.Remove(context.Receipts.FirstOrDefault(r => r.id == receiptId));
            context.SaveChanges();
            return Ok(new { message = "The receipt is succesfully delleted!" });
        }

        [HttpGet("getReceipt/{email}")]
        //TO DO
        public async Task<ActionResult> GetReceipt(string email, string receiptId)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            if (context.Receipts.FirstOrDefault(r => r.id == receiptId) == null)
            {
                return NotFound(new { message = "Receipt not found." });
            }
            return Ok(new { receipt = context.Receipts.FirstOrDefault(r => r.id == receiptId), items = context.ReceiptItems.Where(i => i.ReceiptId == receiptId), message = "Operation succesful." });
        }

        [HttpGet("getAllReceiptsItemsOfUser/{email}")]
        //TO DO
        public async Task<ActionResult> GetAllReceiptsItemsOfUser(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            return Ok();

        }

        [HttpGet("getLastBudget/{email}")]
        public async Task<ActionResult> GetLastBudget(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }

            // Fetch the list of budgets
            var budgets = await context.Budgets
                                        .Where(b => b.UserId == userInfo.Id)
                                        .ToListAsync(); // Bring all data to memory

            // Order the budgets in memory
            var lastBudget = budgets
                                .OrderBy(b => b.CreatedAt)
                                .FirstOrDefault();

            decimal elementsAmountsSum = context.Elements
                .Where(e => e.budgetId == lastBudget.id)
                .Select(e => e.amount)
                .ToList()
                .Sum();

            if (lastBudget == null)
            {
                return NotFound(new { message = "Budget not found." });
            }

            return Ok(new { budget = lastBudget, elementsSum = elementsAmountsSum });
        }


        [HttpGet("getUser/{email}")]
        public async Task<ActionResult> getUser(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            return Ok(new { user = userInfo });
        }

        [HttpGet("getLastTenElements/{email}")]
        public async Task<ActionResult> getLastTenElements(string email)
        {
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
            List<Elements> userElements = await context.Elements
                .Where(e => e.budgets.UserId == userInfo.Id)
                .OrderByDescending(e => e.createdAt)
                .Take(10)
                .Include(e => e.budgets) // ✅ Load related budget
                .ToListAsync();


            return Ok(new { lastElements = userElements });
        }

        [HttpPost("addUserReceipt/{email}")]
        public async Task<ActionResult> AddUserReceipt(string email, UsersReceiptsDTO receipt)
        {
            // Get user info by email
            User userInfo = await userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }

            // Check if the receipt already exists
            List<UsersReceipts> usersReceipts = context.UsersReceipts.Where(r => r.UserId == userInfo.Id).ToList();
            if (usersReceipts.FirstOrDefault(r => r.id == receipt.id) != null)
            {
                return BadRequest(new { message = "User has already registered this receipt." });
            }

            // Add the new receipt, setting only UserId
            UsersReceipts receiptToAdd = new UsersReceipts()
            {
                id = receipt.id,
                DateTime = receipt.DateTime,
                ShopId = receipt.ShopId,
                ShopImage = receipt.ShopImage,
                TotalAmount = receipt.TotalAmount,
                UserId = userInfo.Id // Only set UserId here
            };

            // Add to the database and save changes
            context.UsersReceipts.Add(receiptToAdd);
            await context.SaveChangesAsync();

            return Ok(new { message = "The receipt is successfully added!" });
        }

        [HttpPost("updateUser/{email}")]
        public async Task<ActionResult> UpdateUser(string email, [FromBody] UpdateUserDTO model)
        {
            User userInfo = await userManager.FindByEmailAsync(email);

            if (userInfo == null)
            {
                return BadRequest(new { message = "User not found." });
            }

            // Update name and email
            userInfo.Name = model.UserName;
            userInfo.Email = model.NewEmail;
            userInfo.Theme = model.Theme;
            userInfo.Language = model.Language;

            // Save changes properly
            context.Users.Update(userInfo);
            await context.SaveChangesAsync();

            return Ok(new { message = "User successfully updated." });
        }

    }
}
