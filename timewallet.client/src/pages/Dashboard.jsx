import { Link, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"
import {
	createBudget,
	createExpense,
	deleteExpense,
	deleteItem,
	fetchData,
	waait,
	calculateSpentByBudget,
} from "../helpers"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../components/LanguageSwitcher"

async function fetchDataFromApi() {
	const user = localStorage.getItem("user")

	try {
		const response = await fetch(
			`api/timewallet/getInformationAboutUser/${user}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-cache",
			}
		)

		// if (!response.ok) {
		// 	throw new Error("Error fetching data from API.")
		// }

		const data = await response.json()

		console.log(JSON.parse(data.budgetJson))
		console.log(JSON.parse(data.elementJson))

		return {
			budgets: JSON.parse(data.budgetJson),
			expenses: JSON.parse(data.elementJson),
		}
	} catch (error) {
		console.error(error)
		return { budgets: [], expenses: [] }
	}
}

// Function for loading budgets and expenses
export async function dashboardLoader() {
	try {
		const { budgets, expenses } = await fetchDataFromApi()

		console.log("check")
		localStorage.setItem("budgets", JSON.stringify(budgets))
		localStorage.setItem("expenses", JSON.stringify(expenses))

		// const budgetsCheck = JSON.parse(localStorage.getItem("budgets")) || [];

		// console.log(budgets);

		// for (let i = 0; i < budgets.length; i++) {
		// 	if (budgetsCheck.includes(budgets[i])){
		// 		console.log(budgets[i]);
		// 	}
		// console.log(budgetsCheck)
		// console.log(budgets[i]);
		// }
		// console.log(budgetsCheck);
		// console.log(budgets[0]);
		// budgetsCheck.push(budgets[0])
		// localStorage.setItem("budgets", JSON.stringify(budgetsCheck));

		return { budgets, expenses }
	} catch (error) {
		console.error("Error loading dashboard data:", error)
		return { budgets: [], expenses: [] }
	}
}
// All available actions
export async function dashboardAction({ request }) {
	await waait()

	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)

	if (_action === "createBudget") {
		try {
			let budgetLengthCheck = values.newBudget
			if (budgetLengthCheck.length > 19) {
				return toast.error(
					"Budget name is too long. It must be 19 characters or fewer"
				)
			} else {
				await createBudget({
					name: values.newBudget,
					amount: values.newBudgetAmount,
				})
			}
			return null
		} catch (e) {
			console.error("Error creating budget:", e)
			return toast.error("There was a problem creating your budget.")
		}
	}

	if (_action === "createExpense") {
		let budgetFinder = fetchData("budgets")
		let expenseLengthCheck = values.newExpense

		const selectedBudget = budgetFinder.find(
			(budget) => budget.id === values.newExpenseBudget
		)

		// Get the total spent by the budget
		const totalSpent = calculateSpentByBudget(values.newExpenseBudget)
		const remainingAmount = selectedBudget.Amount - totalSpent
		const expenseAmount = parseFloat(values.newExpenseAmount)

		// Check if the expense exceeds the remaining balance of the budget
		if (expenseAmount > remainingAmount) {
			return toast.error(
				`${t("register.namePlaceholder")} ${remainingAmount.toFixed(
					2
				)}$`
			)
		}
		if (expenseLengthCheck.length > 11) {
			return toast.error(
				"Expense name is too long. It must be 11 characters or fewer"
			)
		}
		try {
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			})
			return toast.success(`Expense ${values.newExpense} created!`)
		} catch (e) {
			throw new Error("There was a problem creating your expense.")
		}
	}

	if (_action === "deleteExpense") {
		try {
			deleteExpense({
				key: "expenses",
				id: values.expenseId,
			})
			return toast.success("Expense deleted!")
		} catch (e) {
			throw new Error("There was a problem deleting your expense.")
		}
	}
}

const Dashboard = () => {
	const { budgets, expenses } = useLoaderData()
	const [userInfo, setUserInfo] = useState({})
	const { t } = useTranslation() // useTranslation hook to fetch translations

	useEffect(() => {
		const user = localStorage.getItem("user")
		fetch("api/timewallet/home/" + user, {
			method: "GET",
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setUserInfo(data.userInfo)
			})
			.catch((error) => {
				console.log("Error home page: ", error)
			})
	}, [])

	return (
		<div style={{ minHeight: "100%" }}>
			<div className="dashboard">
				<div className="info-text">
					<h2 style={{ fontFamily: "DM Serif Display" }}>
						{t("dashboard.welcomeText")}{" "}
						<span className="accent accent-name">
							{userInfo.name}
						</span>
						!
					</h2>
				</div>

				{/* Language Switcher */}
				<div style={{ position: "absolute", top: 10, right: 10 }}>
					<LanguageSwitcher />
				</div>

				<div className="dashboard-main">
					{budgets && budgets.length > 0 ? (
						<div>
							<div className="dashboard-action">
								<AddBudgetForm />
								<AddExpenseForm budgets={budgets} />
							</div>
							<h2
								className="info-text"
								style={{
									marginTop: "30px",
									fontFamily: "DM Serif Display",
								}}
							>
								{t("dashboard.existingBudgets")}
							</h2>

							<div className="all-budgets">
								{/* Renders all budgets available */}
								{budgets.map((budget) => (
									<BudgetItem
										key={budget.id}
										budget={budget}
									/>
								))}
							</div>

							{expenses && expenses.length > 0 && (
								<div>
									<h2
										className="info-text"
										style={{
											marginTop: "30px",
											marginBottom: "5px",
											fontFamily: "DM Serif Display",
										}}
									>
										{t("dashboard.recentExpenses")}
									</h2>
									<Table
										expenses={expenses
											.sort(
												(a, b) =>
													b.createdAt - a.createdAt
											)
											.slice(0, 8)}
										showBudget={false}
									/>
									{expenses.length > 8 && (
										<Link to="expenses">
											{t("dashboard.viewAllExpenses")}
										</Link>
									)}
								</div>
							)}
						</div>
					) : (
						<div>
							<div className="info-text">
								<h4>{t("dashboard.createBudgetMessage")}</h4>
							</div>
							<div className="dashboard-action">
								<AddBudgetForm />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
