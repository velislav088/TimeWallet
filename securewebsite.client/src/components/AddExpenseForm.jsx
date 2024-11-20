import { useEffect, useRef } from "react"
import { useFetcher } from "react-router-dom"

const AddExpenseForm = ({ budgets }) => {
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
		<div className="form-wrapper expense">
			<h5>
				Add New{" "}
				<span className="accent">
					{/* Show budget name if theres only 1 available */}
					{budgets.length === 1 &&
						`${budgets.map((budg) => budg.name)}`}
				</span>{" "}
				Expense
			</h5>
			<fetcher.Form method="post" ref={formRef}>
				<div>
					<div>
						<label htmlFor="newExpense">Expense Name</label>
						<input
							type="text"
							name="newExpense"
							id="newExpense"
							placeholder="e.g., Coffee"
							ref={focusRef}
							required
						/>
					</div>
					<div>
						<label htmlFor="newExpenseAmount">Amount</label>
						<input
							type="number"
							step="0.01"
							inputMode="decimal"
							name="newExpenseAmount"
							id="newExpenseAmount"
							placeholder="e.g., 1.50"
							required
						/>
					</div>
				</div>
				<div hidden={budgets.length === 1}>
					<label htmlFor="newExpenseBudget">Budget Category</label>
					<select
						name="newExpenseBudget"
						id="newExpenseBudget"
						required
					>
						{/* Shows all available expenses */}
						{budgets
							.sort((a, b) => a.createdAt - b.createdAt)
							.map((budget) => {
								return (
									<option key={budget.id} value={budget.id}>
										{budget.name}
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
						<span className="submit-span">Submitting…</span>
					) : (
						<>
							<span className="submit-span">Add Expense</span>
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}
export default AddExpenseForm
