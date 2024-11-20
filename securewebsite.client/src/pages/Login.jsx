import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {
	document.title = "Login"

	// dont ask an already logged in user to login over and over again
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
			<form action="#" className="login" onSubmit={loginHandler}>
				<h3>Login Here</h3>
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
					name="Password"
					id="password"
					required
				/>

				<ul className="login-checkbox">
					<li>
						<label htmlFor="remember">Remember Password?</label>
					</li>
					<li>
						<input
							type="checkbox"
							name="Remember"
							id="remember"
							className="checkbox"
						/>
					</li>
				</ul>

				<input type="submit" value="Login" className="button" />

				<div className="logout-redirect">
					<span>Or </span>
					<Link to="/register">Register</Link>
				</div>
			</form>
		</div>
	)
	async function loginHandler(e) {
		e.preventDefault()
		const form_ = e.target,
			submitter = document.querySelector("input.login")

		const formData = new FormData(form_, submitter),
			dataToSend = {}

		for (const [key, value] of formData) {
			dataToSend[key] = value
		}

		if (dataToSend.Remember === "on") {
			dataToSend.Remember = true
		}

		console.log("login data before send: ", dataToSend)
		const response = await fetch("api/timewallet/login", {
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
			localStorage.setItem("user", dataToSend.Email)
			toast.success(data.message || "Registered successfully", {
				autoClose: 1500, // 1.5-second auto close
			})
			document.location = "/"
		} else {
			let errorMessage = data.message
			toast.error(errorMessage)
		}
	}
}

export default Login
