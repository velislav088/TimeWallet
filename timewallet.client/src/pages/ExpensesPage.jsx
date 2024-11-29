import { useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import Table from "../components/Table"
import { deleteItem, fetchData } from "../helpers"

// Function for loading all expenses
export async function expensesLoader() {
	const expenses = fetchData("expenses")
	return { expenses }
}

// Expense delete action
export async function expensesAction({ request }) {
	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)

	if (_action === "deleteExpense") {
		try {
			deleteItem({
				key: "expenses",
				id: values.expenseId,
			})
			return toast.success("Разход премахнат!")
		} catch (e) {
			throw new Error("Имаше проблем при премахването на разхода ви.")
		}
	}
}

const ExpensesPage = () => {
	const { expenses } = useLoaderData()

	return (
		<div className="grid-lg">
			<h1>Всички Разходи</h1>
			{expenses && expenses.length > 0 ? (
				<div className="grid-md">
					<h2>
						Скорошни Разходи <small>({expenses.length} общо)</small>
					</h2>
					<Table expenses={expenses} />
				</div>
			) : (
				<p>Няма разходи за показване.</p>
			)}
		</div>
	)
}

export default ExpensesPage
