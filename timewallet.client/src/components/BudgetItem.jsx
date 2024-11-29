import { Form, Link } from "react-router-dom"
import {
	calculateSpentByBudget,
	formatCurrency,
	formatPercentage,
} from "../helpers"

const BudgetItem = ({ budget, showDelete = false }) => {
	const { id, Name, Amount } = budget
	const spent = calculateSpentByBudget(id)

	return (
		<div className="form-wrapper budget-box budget-item budget-page-item">
			<div className="budget">
				<div className="progress-text">
					<h5 className="accent">{Name}</h5>
					<h6 className="amount-budgeted">
						<span className="accent budgeted">
							{formatCurrency(Amount)}
						</span>{" "}
						Предвидени
					</h6>
				</div>
				<progress max={Amount} value={spent}>
					{formatPercentage(spent / Amount)}
				</progress>
				<div className="progress-text bottom">
					<small>{formatCurrency(spent)} изразходени | </small>
					<small>{formatCurrency(Amount - spent)} оставащи</small>
				</div>
				{showDelete ? (
					<div>
						<Form
							method="post"
							action="delete"
							onSubmit={(event) => {
								if (
									!confirm(
										"Сигурни ли сте, че искате да изтриете този бюджет?"
									)
								) {
									event.preventDefault()
								}
							}}
						>
							<button className="button" type="submit">
								<span className="submit-span">Изтрий Бюджет</span>
							</button>
						</Form>
					</div>
				) : (
					<div>
						<Link to={`/budget/${id}`} className="link">
							<span className="link">Виж Детайли</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
export default BudgetItem
