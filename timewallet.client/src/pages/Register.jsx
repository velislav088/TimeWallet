import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import GoogleTranslate from "../components/GoogleTranslate"

function Register() {
	document.title = "Register"

	// Don't ask an already registered user to register over and over again
	useEffect(() => {
		const user = localStorage.getItem("user")
		if (user) {
			document.location = "/"
		}
	}, [])

	return (
		<div className="auth-container">
			<div className="background">
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<form action="#" className="register" onSubmit={registerHandler}>
				<h3>Register Here</h3>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					placeholder="Name"
					name="Name"
					id="name"
					required
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="Email"
					id="email"
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="PasswordHash"
					id="password"
					required
				/>

				<input type="submit" value="Register" className="button" />

				<div className="logout-redirect">
					<span>Or </span>
					<Link to="/login">Login</Link>
				</div>
			</form>
		</div>
	)
	async function registerHandler(e) {
		e.preventDefault()
		const form_ = e.target,
			submitter = document.querySelector("input.login")

		const formData = new FormData(form_, submitter),
			dataToSend = {}

		for (const [key, value] of formData) {
			dataToSend[key] = value
		}

		// Create username
		const newUserName = dataToSend.Name.trim().split(" ")
		dataToSend.UserName = newUserName.join("")

		const response = await fetch("api/timewallet/register", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(dataToSend),
			headers: {
				"content-type": "Application/json",
				Accept: "application/json",
			},
		})

		const data = await response.json()

		if (response.ok) {
			toast.success(data.message || "Registered successfully", {
				autoClose: 1500,
			})
			setTimeout(() => {
				document.location = "/login"
			}, 2000)
		}

		if (data.message) {
			messageEl.innerHTML = data.message
		} else {
			let errorMessages = ""
			data.errors.forEach((error) => {
				errorMessages = error.description
				toast.error(errorMessages)
			})
		}

		console.log("login error: ", data)
	}
}

export default Register
