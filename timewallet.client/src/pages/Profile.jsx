import { useEffect, useState } from "react"
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2"
import { calculateSpentByBudget, fetchData } from "../helpers"
import Table from "../components/Table"

function Profile() {
	document.title = "Profile"
	const budgets = fetchData("budgets")
	const expenses = fetchData("expenses")
	console.log(expenses)
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		const user = localStorage.getItem("user")
		fetch("api/timewallet/home/" + user, {
			method: "GET",
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setUserInfo(data.userInfo)
				console.log("user info: ", data.userInfo)
			})
			.catch((error) => {
				console.log("Error home page: ", error)
			})
	}, [])
	return (
		<section className="profile-page">
			<header className="info-text">
				<h2 style={{ fontFamily: "DM Serif Display" }}>
					Welcome to your page
				</h2>
			</header>
			{userInfo ? (
				<div className="profile-info-div">
					<div className="form-wrapper profile-form user-info">
						<h4>
							Name:{" "}
							<span className="accent">{userInfo.name}</span>
						</h4>
						<h4>
							Email:{" "}
							<span className="accent">{userInfo.email}</span>
						</h4>
						<h4>
							Created Date:{" "}
							<span className="accent">
								{userInfo.createdDate
									? userInfo.createdDate.split("T")[0]
									: ""}
							</span>
						</h4>
					</div>
					<div className="form-wrapper profile-form">
						<h5>All Budgets</h5>
						<Pie
							data={{
								labels: budgets.map((budget) => budget.Name),
								datasets: [
									{
										label: "Amount",
										data: budgets.map(
											(budget) => budget.Amount
										),
									},
								],
							}}
						/>
					</div>
					<div className="form-wrapper profile-form">
						<h5>All Expenses</h5>
						<Pie
							data={{
								labels: expenses.map((expense) => expense.name),
								datasets: [
									{
										label: "Amount",
										data: expenses.map(
											(expense) => expense.amount
										),
									},
								],
							}}
						/>
					</div>
				</div>
			) : (
				<div className="warning">
					<div>Access Denied!!!</div>
				</div>
			)}
		</section>
	)
}

export default Profile
