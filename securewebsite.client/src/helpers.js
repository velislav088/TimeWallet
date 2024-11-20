export const waait = () =>
	new Promise((res) => setTimeout(res, Math.random() * 800))

// Fetch data from localStorage
export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

// Get all requested items from localStorage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? []
	return data.filter((item) => item[key] === value)
}

// Create budget
export const createBudget = async ({ name, amount }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
	}

	// Update localStorage
	const existingBudgets = fetchData("budgets") ?? []
	const updatedBudgets = [...existingBudgets, newItem]
	localStorage.setItem("budgets", JSON.stringify(updatedBudgets))

	// Update Database
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(`api/securewebsite/addBudget/${user}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})

		const data = await response.json()

		if (response.ok) {
			console.log("Budget successfully created on API:", data)
			return data
		}
		console.log()
	} catch (error) {
		console.error("Failed to create budget on API:", error)
		throw error
	}
}

// Create Expense
export const createExpense = async ({ name, amount, budgetId }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
	}

	// Update localStorage
	const existingExpenses = fetchData("expenses") ?? []
	const updatedExpenses = [...existingExpenses, newItem]
	localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

	// Update Database
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(
			`../api/securewebsite/addElement/${user}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			}
		)

		if (!response.ok) {
			throw new Error(
				`Error: ${response.status} - ${response.statusText}`
			)
		}

		const data = await response.json()
		console.log("Expense successfully created on API:", data)
		return data
	} catch (error) {
		console.error("Failed to create expense on API:", error)

		toast.error(`Failed to create expense: ${error.message}`)

		throw error
	}
}
// Delete budget
export const deleteItem = async ({ key, id }) => {
	const existingData = fetchData(key)

	if (id) {
		try {
			const user = localStorage.getItem("user")
			// Update Database
			const response = await fetch(
				`../api/securewebsite/deleteBudget/${user}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(id),
				}
			)

			if (!response.ok) {
				throw new Error("Failed to delete item from server")
			}

			// Update localStorage
			const newData = existingData.filter((item) => item.id !== id)
			localStorage.setItem(key, JSON.stringify(newData))
			window.location.reload()
		} catch (error) {
			console.error("Error deleting item:", error.message)
			throw error
		}
	} else {
		localStorage.removeItem(key)
	}
}
// Delete expense
export const deleteExpense = async ({ key, id }) => {
	const existingData = fetchData(key)

	if (id) {
		try {
			const user = localStorage.getItem("user")
			// Update Database
			const response = await fetch(
				`../api/securewebsite/deleteElement/${user}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(id),
				}
			)

			if (!response.ok) {
				throw new Error("Failed to delete item from server")
			}

			// Update localStorage
			const newData = existingData.filter((item) => item.id !== id)
			localStorage.setItem(key, JSON.stringify(newData))
			window.location.reload()
		} catch (error) {
			console.error("Error deleting item:", error.message)
			throw error
		}
	} else {
		localStorage.removeItem(key)
	}
}

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
	const expenses = fetchData("expenses") ?? []
	const budgetSpent = expenses.reduce((acc, expense) => {
		// Check if expense.id matches passed budgetId
		if (expense.budgetId !== budgetId) return acc

		// Add the current amount to my total
		return (acc += expense.amount)
	}, 0)
	return budgetSpent
}

// Formatting
export const formatDateToLocaleString = (epoch) =>
	new Date(epoch).toLocaleDateString()

// Formating percentages
export const formatPercentage = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "percent",
		minimumFractionDigits: 0,
	})
}

// Format currency
export const formatCurrency = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "currency",
		currency: "USD",
	})
}
