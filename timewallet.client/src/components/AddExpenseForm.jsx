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
				Създай Нов{" "}
				<span className="accent">
					{/* Show budget name if theres only 1 available */}
					{budgets.length === 1 &&
						`${budgets.map((budg) => budg.name)}`}
				</span>{" "}
				Разход
			</h5>
			<fetcher.Form method="post" ref={formRef}>
				<div>
					<div>
						<label htmlFor="newExpense">Име на Разход</label>
						<input
							type="text"
							name="newExpense"
							id="newExpense"
							placeholder="пр., Кафе"
							ref={focusRef}
							required
						/>
					</div>
					<div>
						<label htmlFor="newExpenseAmount">Стойност</label>
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
					<label htmlFor="newExpenseBudget">Категория на Бюджет</label>
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
						<span className="submit-span">Подаване……</span>
					) : (
						<>
							<span className="submit-span">Създай Разход</span>
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}
export default AddExpenseForm
