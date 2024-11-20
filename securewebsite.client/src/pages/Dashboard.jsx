import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlag } from "@fortawesome/free-regular-svg-icons"
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
import Welcome from "./Welcome"

async function fetchDataFromApi(endpoint) {
	const email = localStorage.getItem("user") // Get the email from localStorage

	try {
		// Call the backend API with the email to fetch budgets and elements
		const response = await fetch(
			`api/securewebsite/getInformationAboutUser/${email}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		if (!response.ok) {
			throw new Error("Error fetching data from API.")
		}

		const data = await response.json()
		return {
			budgets: JSON.parse(data.budgetJson),
			elements: JSON.parse(data.elementJson),
		}
	} catch (error) {
		console.error("Error fetching data from API:", error)
		return { budgets: [], elements: [] } // Return empty arrays on error
	}
}

// Function for loading budgets and expenses
export async function dashboardLoader() {
	try {
		// Fetch data from the API
		const { budgets, expenses } = await fetchDataFromApi()
		// Return the fetched data
		return { budgets, expenses } // You mentioned 'expenses' is the same as 'elements'
	} catch (error) {
		console.error("Error loading dashboard data:", error)
		return { budgets: [], expenses: [] } // Return empty arrays on error
	}
}
// All available actions
export async function dashboardAction({ request }) {
	await waait()

	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)
	let budgetCheck = fetchData("budgets")

	if (_action === "createBudget") {
		try {
			let nameAlreadyExists = budgetCheck.some(
				(budget) => budget.name === values.newBudget
			)
			if (nameAlreadyExists) {
				return toast.error(`${values.newBudget} already exists!`)
			} else {
				await createBudget({
					name: values.newBudget,
					amount: values.newBudgetAmount,
				})
			}
			return toast.success("Budget created!")
		} catch (e) {
			console.error("Error creating budget:", e)
			return toast.error("There was a problem creating your budget.")
		}
	}

	if (_action === "createExpense") {
		let budgetFinder = fetchData("budgets")

		const selectedBudget = budgetFinder.find(
			(budget) => budget.id === values.newExpenseBudget
		)

		// Get the total spent by the budget
		const totalSpent = calculateSpentByBudget(values.newExpenseBudget)
		const remainingAmount = selectedBudget.amount - totalSpent
		const expenseAmount = parseFloat(values.newExpenseAmount)

		// Check if the expense exceeds the remaining balance of the budget
		if (expenseAmount > remainingAmount) {
			return toast.error(
				`Expense exceeds the remaining budget! Available: ${remainingAmount.toFixed(
					2
				)}$`
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
	console.log(budgets)

	useEffect(() => {
		const user = localStorage.getItem("user")
		fetch("api/SecureWebsite/home/" + user, {
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
		<>
			<div className="dashboard">
				<h2>
					Welcome back,{" "}
					<span className="accent">{userInfo.name}</span>!
				</h2>
				<div>
					{budgets && budgets.length > 0 ? (
						<div>
							<div>
								<AddBudgetForm />
								<AddExpenseForm budgets={budgets} />
							</div>
							<h2>Existing Budgets</h2>

							<div>
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
									<h2>Recent Expenses</h2>
									<Table
										expenses={expenses
											.sort(
												(a, b) =>
													b.createdAt - a.createdAt
											)
											.slice(0, 8)}
									/>
									{expenses.length > 8 && (
										<Link to="expenses">
											View all expenses
										</Link>
									)}
								</div>
							)}
						</div>
					) : (
						<div>
							<h4>
								Create a <span className="accent">budget</span>{" "}
								to get started!
							</h4>
							<AddBudgetForm />
						</div>
					)}
				</div>
			</div>
		</>
	)
}
export default Dashboard
