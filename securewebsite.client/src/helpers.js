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

	// Update localStorage (temporary)
	const existingBudgets = fetchData("budgets") ?? []
	const updatedBudgets = [...existingBudgets, newItem]
	localStorage.setItem("budgets", JSON.stringify(updatedBudgets))

	// Post to the db
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(`api/securewebsite/addBudget/${user}`, {
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
		return data
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

	//Update localstorage (temporary)
	const existingExpenses = fetchData("expenses") ?? []
	const updatedExpenses = [...existingExpenses, newItem]
	localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

	//Post to the db
	try {
		const user = localStorage.getItem("user")
		const response = await fetch(`api/securewebsite/addElement/${user}`, {
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
		console.log("Expense successfully created on API:", data)
		return data
	} catch (error) {
		console.error("Failed to create expense on API:", error)
		throw error
	}
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

// Accordion menu functionality
var acc = document.getElementsByClassName("accordion")
var i

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		/* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
		this.classList.toggle("active")

		/* Toggle between hiding and showing the active panel */
		var panel = this.nextElementSibling
		if (panel.style.display === "block") {
			panel.style.display = "none"
		} else {
			panel.style.display = "block"
		}
	})
}
