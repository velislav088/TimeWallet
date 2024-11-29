import { useEffect, useState } from "react"
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2"
import { calculateSpentByBudget, fetchData } from "../helpers"
import Table from "../components/Table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

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
					Добре дошли във вашата страница
				</h2>
			</header>
			{userInfo ? (
				<div className="profile-info-div">
					<div className="form-wrapper profile-form user-info">
						<h4>
							Име:{" "}
							<span className="accent">{userInfo.name}</span>
						</h4>
						<h4>
							Имейл:{" "}
							<span className="accent">{userInfo.email}</span>
						</h4>
						<h4>
							Дата на Създаване:{" "}
							<span className="accent">
								{userInfo.createdDate
									? userInfo.createdDate.split("T")[0]
									: ""}
							</span>
						</h4>
					</div>
					<div className="form-wrapper profile-form">
						<h5>Всички Бюджети</h5>
						{budgets.length === 0 ? (
							<h4>Няма създанени бюджети!</h4>
						) : (
							<Pie
								data={{
									labels: budgets.map(
										(budget) => budget.Name
									),
									datasets: [
										{
											label: "Стойност",
											data: budgets.map(
												(budget) => budget.Amount
											),
										},
									],
								}}
							/>
						)}
					</div>
					<div className="form-wrapper profile-form">
						<h5>Всички Разходи</h5>
						{expenses.length === 0 ? (
							<h4>Няма създанени разходи!</h4>
						) : (
							<Pie
								data={{
									labels: expenses.map(
										(expense) => expense.name
									),
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
						)}
					</div>
				</div>
			) : (
				<div className="warning">
					<div>Достъп Забранен!</div>
				</div>
			)}
			<footer>
				<div className="footer-content auth-footer">
					<p>TimeWallet © 2024 Всички права запазени</p>
					<a href="https://github.com/velislav088/TimeWallet">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a className="footer-links" href="/welcome">
						Начало
					</a>
				</div>
			</footer>
		</section>
	)
}

export default Profile
