import { toast } from "react-toastify"

export const waait = () =>
	new Promise((res) => setTimeout(res, Math.random() * 800))

// local storage fetcher
export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

// get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? []
	return data.filter((item) => item[key] === value)
}

// delete expense from local storage
export const deleteExpense = async ({ key, id }) => {
	const existingData = fetchData(key)

	if (id) {
		try {
			const user = localStorage.getItem("user")
			const response = await fetch(
				`../api/timewallet/deleteElement/${user}`,
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

// delete budget
export const deleteItem = async ({ key, id }) => {
	const existingData = fetchData(key)

	if (id) {
		try {
			const user = localStorage.getItem("user")
			const response = await fetch(
				`../api/timewallet/deleteBudget/${user}`,
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

// create budget
export const createBudget = async ({ name, amount }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
	}

	// update localstorage
	const existingBudgets = fetchData("budgets") ?? []
	const updatedBudgets = [...existingBudgets, newItem]

	// post to the db
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(`api/timewallet/addBudget/${user}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})

		if (!response.ok) {
			const errorData = await response.json() // Parse the error message
			if (errorData.message) {
				return toast.error(errorData.message) // Display the custom message
			}
			return toast.error("There was a problem creating your budget.")
		} else {
			const data = await response.json()
			toast.success("Budget created!")
			localStorage.setItem("budgets", JSON.stringify(updatedBudgets))
			return data
		}
	} catch (error) {
		console.error("Failed to create budget on API:", error)
		throw error
	}
}

// create expense
export const createExpense = async ({ name, amount, budgetId }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
	}

	// update localstorage
	const existingExpenses = fetchData("expenses") ?? []
	const updatedExpenses = [...existingExpenses, newItem]
	localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

	// post to the db
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(
			`../api/timewallet/addElement/${user}`,
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
				`../api/timewallet/deleteBudget/${user}`,
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
				`../api/timewallet/deleteElement/${user}`,
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
		// check if expense.id === budgetId I passed in
		if (expense.budgetId !== budgetId) return acc

		// add the current amount to my total
		return (acc += expense.amount)
	}, 0)
	return budgetSpent
}

// formatting
export const formatDateToLocaleString = (epoch) =>
	new Date(epoch).toLocaleDateString()

// formating percentages
export const formatPercentage = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "percent",
		minimumFractionDigits: 0,
	})
}

// format currency
export const formatCurrency = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "currency",
		currency: "USD",
	})
}
