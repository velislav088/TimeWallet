import { useEffect, useRef } from "react"
import { Form, useFetcher } from "react-router-dom"
import { useTranslation } from "react-i18next"

const AddBudgetForm = () => {
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
		<div className="form-wrapper budget-form">
			<h5>
				{t("addBudgetForm.createBudget")}{" "}
				<span className="accent">{t("addBudgetForm.createBudgetAccent")}</span>
			</h5>
			<fetcher.Form method="post" ref={formRef}>
				<div>
					<label htmlFor="newBudget">
						{t("addBudgetForm.budgetName")}
					</label>
					<input
						type="text"
						name="newBudget"
						id="newBudget"
						placeholder={t("addBudgetForm.budgetNamePlaceholder")}
						required
						ref={focusRef}
					/>
				</div>
				<div>
					<label htmlFor="newBudgetAmount">
						{t("addBudgetForm.amount")}
					</label>
					<input
						type="number"
						step="0.01"
						name="newBudgetAmount"
						id="newBudgetAmount"
						placeholder={t("addBudgetForm.amountPlaceholder")}
						required
						inputMode="decimal"
					/>
				</div>
				<input type="hidden" name="_action" value="createBudget" />
				<button
					type="submit"
					disabled={isSubmitting}
					className="button"
				>
					{isSubmitting ? (
						<span className="submit-span">
							{t("addBudgetForm.submitting")}
						</span>
					) : (
						<span className="submit-span">
							{t("addBudgetForm.createBudgetButton")}
						</span>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}

export default AddBudgetForm
