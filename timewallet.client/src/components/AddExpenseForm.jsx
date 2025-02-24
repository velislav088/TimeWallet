import { useEffect, useRef } from "react"
import { useFetcher } from "react-router-dom"
import { useTranslation } from "react-i18next"

const AddExpenseForm = ({ budgets }) => {
	const fetcher = useFetcher()
	const isSubmitting = fetcher.state === "submitting"

	const formRef = useRef()
	const focusRef = useRef()

	const { t } = useTranslation() // Initialize translation hook

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset()
			focusRef.current.focus()
		}
	}, [isSubmitting])

	return (
		<div className="form-wrapper expense">
			<h5>
				{t("addExpenseForm.addNew")}{" "}
				<span className="accent">
					{/* Show budget name if there's only 1 available */}
					{budgets.length === 1 &&
						`${budgets.map((budg) => budg.name)}`}
				</span>{" "}
				{t("addExpenseForm.expense")}
			</h5>
			<fetcher.Form method="post" ref={formRef}>
				<div>
					<div>
						<label htmlFor="newExpense">
							{t("addExpenseForm.expenseName")}
						</label>
						<input
							type="text"
							name="newExpense"
							id="newExpense"
							placeholder={t(
								"addExpenseForm.expenseNamePlaceholder"
							)}
							ref={focusRef}
							required
						/>
					</div>
					<div>
						<label htmlFor="newExpenseAmount">
							{t("addExpenseForm.amount")}
						</label>
						<input
							type="number"
							step="0.01"
							inputMode="decimal"
							name="newExpenseAmount"
							id="newExpenseAmount"
							placeholder={t("addExpenseForm.amountPlaceholder")}
							required
						/>
					</div>
				</div>
				<div hidden={budgets.length === 1}>
					<label htmlFor="newExpenseBudget">
						{t("addExpenseForm.budgetCategory")}
					</label>
					<select
						name="newExpenseBudget"
						id="newExpenseBudget"
						required
					>
						{/* Shows all available budgets */}
						{budgets
							.sort((a, b) => a.createdAt - b.createdAt)
							.map((budget) => {
								return (
									<option key={budget.id} value={budget.id}>
										{budget.Name}
									</option>
								)
							})}
					</select>
				</div>
				<input type="hidden" name="_action" value="createExpense" />
				<button
					type="submit"
					disabled={isSubmitting}
					className="button"
				>
					{isSubmitting ? (
						<span className="submit-span">
							{t("addExpenseForm.submitting")}
						</span>
					) : (
						<span className="submit-span">
							{t("addExpenseForm.addExpenseButton")}
						</span>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}

export default AddExpenseForm
