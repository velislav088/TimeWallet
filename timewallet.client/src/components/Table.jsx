import ExpenseItem from "./ExpenseItem"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const Table = ({ expenses, showBudget = true }) => {
	// Sort expenses by createdAt from newest to oldest
	const sortedExpenses = [...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<div className="table">
			<table>
				<thead>
					<tr>
						{[
							"Име",
							"Стойност",
							"Дата",
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
