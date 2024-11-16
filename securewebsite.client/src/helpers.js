export const waait = () =>
	new Promise((res) => setTimeout(res, Math.random() * 800))

// colors
const generateRandomColor = () => {
	const existingBudgetLength = fetchData("budgets")?.length ?? 0
	return `${existingBudgetLength * 34} 65% 50%`
}

// local storage fetcher
export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

// get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? []
	return data.filter((item) => item[key] === value)
}

// delete items from local storage
export const deleteItem = ({ key, id }) => {
	const existingData = fetchData(key)
	if (id) {
		const newData = existingData.filter((item) => item.id !== id)
		return localStorage.setItem(key, JSON.stringify(newData))
	}
	return localStorage.removeItem(key)
}

// create budget
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

	// Post to the API
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(`api/securewebsite/addTransaction/${user}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})

		if (!response.ok) {
			throw new Error(
				`Error: ${response.status} - ${response.statusText}`
			)
		}

		const data = await response.json()
		console.log("Budget successfully created on API:", data)
		return data // Return the response data if needed
	} catch (error) {
		console.error("Failed to create budget on API:", error)
		throw error // Rethrow the error for higher-level handling
	}
}

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
	}
	const existingExpenses = fetchData("expenses") ?? []
	return localStorage.setItem(
		"expenses",
		JSON.stringify([...existingExpenses, newItem])
	)
}

// total spent by budget
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

// FORMATTING
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
