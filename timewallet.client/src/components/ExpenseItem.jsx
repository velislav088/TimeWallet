import { Link, useFetcher } from "react-router-dom"
import {
	formatCurrency,
	formatDateToLocaleString,
	getAllMatchingItems,
} from "../helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

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
			{showBudget && <td></td>}
			<td>
				<fetcher.Form method="post">
					<input type="hidden" name="_action" value="deleteExpense" />
					<input type="hidden" name="expenseId" value={expense.id} />
					<button
						type="submit"
						className="button-trashcan"
						aria-label={`Delete ${expense.name} expense`}
					>
						<FontAwesomeIcon icon={faTrashCan} className="trashcan-icon" />
					</button>
				</fetcher.Form>
			</td>
		</>
	)
}
export default ExpenseItem
