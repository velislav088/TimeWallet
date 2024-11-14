import { Form, Link } from "react-router-dom"
import {
	calculateSpentByBudget,
	formatCurrency,
	formatPercentage,
} from "../helpers"

const BudgetItem = ({ budget, showDelete = false }) => {
	const { id, name, amount, color } = budget
	const spent = calculateSpentByBudget(id)

	return (
		<div className="form-wrapper budget-box">
			<div
				className="budget"
				style={{
					"--accent": color,
				}}
			>
				<div className="progress-text">
					<h5 className="accent">{name}</h5>
					<p><span className="accent budgeted">{formatCurrency(amount)}</span> Budgeted</p>
				</div>
				<progress max={amount} value={spent}>
					{formatPercentage(spent / amount)}
				</progress>
				<div className="progress-text">
					<small>{formatCurrency(spent)} spent</small>
					<small>{formatCurrency(amount - spent)} remaining</small>
				</div>
				{showDelete ? (
					<div>
						<Form
							method="post"
							action="delete"
							onSubmit={(event) => {
								if (
									!confirm(
										"Are you sure you want to permanently delete this budget?"
									)
								) {
									event.preventDefault()
								}
							}}
						>
							<button type="submit">
								<span>Delete Budget</span>
							</button>
						</Form>
					</div>
				) : (
					<div>
						<Link to={`/budget/${id}`}>
							<span>View Details</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
export default BudgetItem
