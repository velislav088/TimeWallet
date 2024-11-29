import { json, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"
import {
	calculateSpentByBudget,
	createExpense,
	deleteExpense,
	deleteItem,
	fetchData,
	getAllMatchingItems,
} from "../helpers"

// Function for loading given budget and it's expenses
export async function budgetLoader({ params }) {
	const budget = await getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: params.id,
	})[0]

	const expenses = await getAllMatchingItems({
		category: "expenses",
		key: "budgetId",
		value: params.id,
	})

	if (!budget) {
		throw new Error("The budget you’re trying to find doesn’t exist")
	}
	return { budget, expenses }
}

// All available actions
export async function budgetAction({ request }) {
	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)

	if (_action === "createExpense") {
		let budgetFinder = fetchData("budgets")
		let expenseLengthCheck = values.newExpense

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

const BudgetPage = () => {
	const { budget, expenses } = useLoaderData()
	console.log(budget)
	return (
		<div className="budget-page">
			<div className="info-text">
				<h2 style={{ fontFamily: "DM Serif Display" }}>
					<span className="accent">{budget.Name}</span> Преглед
				</h2>
			</div>
			<div className="budget-page-main">
				<div className="dashboard-action">
					<BudgetItem budget={budget} showDelete={true} />
					<AddExpenseForm budgets={[budget]} />
				</div>
				{expenses && expenses.length > 0 && (
					<div>
						<div className="info-text">
							<h2
								style={{
									marginTop: "20px",
									marginBottom: "20px",
									fontFamily: "DM Serif Display",
								}}
							>
								<span className="accent">{budget.Name}</span>{" "}
								Разходи
							</h2>
						</div>
						<Table expenses={expenses} showBudget={false} />
					</div>
				)}
			</div>
		</div>
	)
}
export default BudgetPage
