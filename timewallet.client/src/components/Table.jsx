import ExpenseItem from "./ExpenseItem"
import { useTranslation } from "react-i18next"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const Table = ({ expenses, showBudget = true }) => {
	const { t } = useTranslation()

	// Sort expenses by createdAt from newest to oldest
	const sortedExpenses = [...expenses].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	)

	return (
		<div className="table">
			<table>
				<thead>
					<tr>
						{[
							t("table.name"),
							t("table.amount"),
							t("table.date"),
							showBudget ? "Budget" : "",
							"",
						].map((i, index) => (
							<th key={index}>{i}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedExpenses.map((expense) => (
						<tr key={expense.id}>
							<ExpenseItem
								expense={expense}
								showBudget={showBudget}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
export default Table
