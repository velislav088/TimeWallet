import React from "react"
import { fetchData } from "../components/helpers"
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import AddBudget from "../components/AddBudget"

export function homeLoader() {
	const userName = fetchData("userName")
	const budgets = fetchData("budgets")
	const expenses = fetchData("expenses")
	return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {
	await waait()

	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)

	if (_action === "createBudget") {
		try {
			createBudget({
				name: values.newBudget,
				amount: values.newBudgetAmount,
			})
			return toast.success("Budget created!")
		} catch (e) {
			throw new Error("There was a problem creating your budget.")
		}
	}
}

const Home = () => {
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		fetchData(setUserInfo)
	}, [])

	return (
		<div>
			<AddBudget />
		</div>
	)
}

export default Home
