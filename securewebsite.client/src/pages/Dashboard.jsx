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
	deleteItem,
	fetchData,
	waait,
} from "../helpers"
import { useEffect, useState } from "react"
import Welcome from "./Welcome"

// loader
export function dashboardLoader() {
	const budgets = fetchData("budgets")
	const expenses = fetchData("expenses")
	return { budgets, expenses }
}

// action
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
			return {
				success: false,
				message: "There was a problem creating your budget.",
			}
		}
	}

	if (_action === "createExpense") {
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
			deleteItem({
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
