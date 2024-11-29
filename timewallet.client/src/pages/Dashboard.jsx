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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

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
			}
		)

		if (!response.ok) {
			throw new Error("Error fetching data from API.")
		}

		const data = await response.json()
		console.log(JSON.parse(data.elementJson))
		return {
			budgets: JSON.parse(data.budgetJson),
			expenses: JSON.parse(data.elementJson),
		}
	} catch (error) {
		console.error("Error fetching data from API:", error)
		return { budgets: [], elements: [] }
	}
}

// Function for loading budgets and expenses
export async function dashboardLoader() {
	try {
		const { budgets, expenses } = await fetchDataFromApi()
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

			if (values.newBudgetAmount < 0) {
				return toast.error("Бюджета не може да е по-малко от 0!")
			}
			if (budgetLengthCheck.length > 19) {
				return toast.error(
					"Името на бюджета трябва да е 19 символа или по-малко"
				)
			} else {
				await createBudget({
					name: values.newBudget,
					amount: values.newBudgetAmount,
				})
			}
			return null
		} catch (e) {
			console.error("Проблем при създаването на бюджет:", e)
			return toast.error("Имаше проблем при създаването на бюджета ви.")
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

		if (values.newExpenseAmount < 0) {
			return toast.error("Разхода не може да е по-малко от 0!")
		}

		// Check if the expense exceeds the remaining balance of the budget
		if (expenseAmount > remainingAmount) {
			return toast.error(
				`Разхода надвишава оставащия бюджет! Остават: ${remainingAmount.toFixed(
					2
				)}$`
			)
		}
		if (expenseLengthCheck.length > 11) {
			return toast.error(
				"Името на разхода трябва да е 11 символа или по-малко"
			)
		}
		try {
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			})
			return toast.success(`Разход ${values.newExpense} създаден!`)
		} catch (e) {
			throw new Error("Имаше проблем при създаването на разхода ви.")
		}
	}

	if (_action === "deleteExpense") {
		try {
			deleteExpense({
				key: "expenses",
				id: values.expenseId,
			})
			return toast.success("Разход премахнат!")
		} catch (e) {
			throw new Error("Имаше проблем при премахването на разхода ви.")
		}
	}
}

const Dashboard = () => {
	const { budgets, expenses } = useLoaderData()
	const [userInfo, setUserInfo] = useState({})

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
						Добре дошли обратно,{" "}
						<span className="accent accent-name">
							{userInfo.name}
						</span>
						!
					</h2>
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
								Съществуващи Бюджети
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
										Скорошни Разходи
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
								</div>
							)}
						</div>
					) : (
						<div>
							<div className="info-text">
								<h4>
									Създай{" "}
									<span className="accent">Бюджет</span> за да
									започнеш!
								</h4>
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
