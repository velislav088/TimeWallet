import React from "react"
import { Form } from "react-router-dom"
import { createBudget } from "./helpers"

const AddBudget = () => {
	return (
		<div>
			<h2>Create budget</h2>
			<Form method="post">
				<div>
					<label htmlFor="newBudget">Budget Name</label>
					<input
						type="text"
						name="newBudget"
						id="newBudget"
						placeholder="e.g., Groceries"
						required
					/>
				</div>
				<div>
					<label htmlFor="newBudgetAmount">Amount</label>
					<input
						type="number"
						step={0.01}
						name="newBudgetAmount"
						id="newBudgetAmount"
						placeholder="e.g., $350"
						required
						inputMode="decimal"
					/>
				</div>
				<input type="hidden" name="_action" value={createBudget} />
				<button type="submit">Create budget</button>
			</Form>
		</div>
	)
}

export default AddBudget
