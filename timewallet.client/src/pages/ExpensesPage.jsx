import { useLoaderData } from "react-router-dom"
import { useTranslation } from "react-i18next"
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
			return toast.success("Expense deleted!")
		} catch (e) {
			throw new Error("There was a problem deleting your expense.")
		}
	}
}

const ExpensesPage = () => {
	const { budgets } = useLoaderData()
	const { expenses } = useLoaderData()
	const { t } = useTranslation() // Initialize translation

	return (
		<div className="grid-lg">
			<h1>{t("expenses.title")}</h1>
			{expenses && expenses.length > 0 ? (
				<div>
					<h2>
						{t("expenses.recent")}{" "}
						<small>({expenses.length} {t("expenses.total")})</small>
					</h2>
					<Table expenses={expenses} showBudget={false} />
				</div>
			) : (
				<p>{t("expenses.no_expenses")}</p>
			)}
		</div>
	)
}

export default ExpensesPage
