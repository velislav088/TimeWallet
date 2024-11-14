import { useEffect, useRef } from "react"
import { Form, useFetcher } from "react-router-dom"

const AddBudgetForm = () => {
	const fetcher = useFetcher()
	const isSubmitting = fetcher.state === "submitting"

	const formRef = useRef()
	const focusRef = useRef()

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset()
			focusRef.current.focus()
		}
	}, [isSubmitting])
	return (
		<div className="form-wrapper budget-form">
			<h5>
				Create <span className="accent">Budget</span>
			</h5>
			<fetcher.Form method="post" ref={formRef}>
				<div>
					<label htmlFor="newBudget">Budget Name</label>
					<input
						type="text"
						name="newBudget"
						id="newBudget"
						placeholder="e.g., Entertainment"
						required
						ref={focusRef}
					/>
				</div>
				<div>
					<label htmlFor="newBudgetAmount">Amount</label>
					<input
						type="number"
						step="0.01"
						name="newBudgetAmount"
						id="newBudgetAmount"
						placeholder="e.g., $450"
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
						<span className="submit-span">Submitting…</span>
					) : (
						<>
							<span className="submit-span">Create Budget</span>
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}
export default AddBudgetForm
