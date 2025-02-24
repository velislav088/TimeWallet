import { Form, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
	calculateSpentByBudget,
	formatCurrency,
	formatPercentage,
} from "../helpers"

const BudgetItem = ({ budget, showDelete = false }) => {
	const { id, Name, Amount } = budget
	const spent = calculateSpentByBudget(id)
	const { t } = useTranslation() // Initialize translation hook

	return (
		<div className="form-wrapper budget-box budget-item budget-page-item">
			<div className="budget">
				<div className="progress-text">
					<h5 className="accent">{Name}</h5>
					<h6 className="amount-budgeted">
						<span className="accent budgeted">
							{formatCurrency(Amount)}
						</span>{" "}
						{t("budgetItem.budgeted")}
					</h6>
				</div>
				<progress max={Amount} value={spent}>
					{formatPercentage(spent / Amount)}
				</progress>
				<div className="progress-text bottom">
					<small>
						{formatCurrency(spent)} {t("budgetItem.spent")} |{" "}
					</small>
					<small>
						{formatCurrency(Amount - spent)}{" "}
						{t("budgetItem.remaining")}
					</small>
				</div>
				{showDelete ? (
					<div>
						<Form
							method="post"
							action="delete"
							onSubmit={(event) => {
								if (
									!window.confirm(
										t("budgetItem.deleteBudgetConfirmation")
									)
								) {
									event.preventDefault()
								}
							}}
						>
							<button className="button" type="submit">
								<span className="submit-span">
									{t("budgetItem.deleteBudgetButton")}
								</span>
							</button>
						</Form>
					</div>
				) : (
					<div>
						<Link to={`/budget/${id}`} className="link">
							<span className="link">
								{t("budgetItem.viewDetailsButton")}
							</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default BudgetItem
