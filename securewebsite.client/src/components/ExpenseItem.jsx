import { Link, useFetcher } from "react-router-dom"
import {
	formatCurrency,
	formatDateToLocaleString,
	getAllMatchingItems,
} from "../helpers"

const ExpenseItem = ({ expense, showBudget }) => {
	const fetcher = useFetcher()

	const budget = getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: expense.budgetId,
	})[0]

	return (
		<>
			<td>{expense.name}</td>
			<td>{formatCurrency(expense.amount)}</td>
			<td>{formatDateToLocaleString(expense.createdAt)}</td>
			{showBudget && (
				<td>
				</td>
			)}
			<td>
				<fetcher.Form method="post">
					<input type="hidden" name="_action" value="deleteExpense" />
					<input type="hidden" name="expenseId" value={expense.id} />
					<button
						type="submit"
						className="btn btn--warning"
						aria-label={`Delete ${expense.name} expense`}
					></button>
				</fetcher.Form>
			</td>
		</>
	)
}
export default ExpenseItem
