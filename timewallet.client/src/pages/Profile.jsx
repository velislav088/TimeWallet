import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Chart as ChartJS } from "chart.js/auto"
import { Pie } from "react-chartjs-2"
import { calculateSpentByBudget, fetchData } from "../helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

function Profile() {
	const { t } = useTranslation() // Initialize translation
	document.title = t("profile.title")

	const budgets = fetchData("budgets")
	const expenses = fetchData("expenses")
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
			})
			.catch((error) => {
				console.log("Error home page: ", error)
			})
	}, [])

	return (
		<section className="profile-page">
			<header className="info-text">
				<h2 style={{ fontFamily: "DM Serif Display" }}>
					{t("profile.welcome")}
				</h2>
			</header>
			{userInfo ? (
				<div className="profile-info-div">
					<div className="form-wrapper profile-form user-info">
						<h4>
							{t("profile.name")}:{" "}
							<span className="accent">{userInfo.name}</span>
						</h4>
						<h4>
							{t("profile.email")}:{" "}
							<span className="accent">{userInfo.email}</span>
						</h4>
						<h4>
							{t("profile.created_date")}:{" "}
							<span className="accent">
								{userInfo.createdDate
									? userInfo.createdDate.split("T")[0]
									: ""}
							</span>
						</h4>
					</div>
					<div className="form-wrapper profile-form">
						<h5>{t("profile.all_budgets")}</h5>
						{budgets.length === 0 ? (
							<h4>{t("profile.no_budgets")}</h4>
						) : (
							<Pie
								data={{
									labels: budgets.map(
										(budget) => budget.Name
									),
									datasets: [
										{
											label: t("profile.amount"),
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
						<h5>{t("profile.all_expenses")}</h5>
						{expenses.length === 0 ? (
							<h4>{t("profile.no_expenses")}</h4>
						) : (
							<Pie
								data={{
									labels: expenses.map(
										(expense) => expense.name
									),
									datasets: [
										{
											label: t("profile.amount"),
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
					<div>{t("profile.access_denied")}</div>
				</div>
			)}
			<footer>
				<div className="footer-content auth-footer">
					<p>TimeWallet © 2024 {t("profile.rights_reserved")}</p>
					<a href="https://github.com/velislav088/TimeWallet">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a className="footer-links" href="/welcome">
						{t("profile.home")}
					</a>
				</div>
			</footer>
		</section>
	)
}

export default Profile
