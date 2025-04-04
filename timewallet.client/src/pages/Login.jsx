import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Login() {
	document.title = "Login";
	const { t } = useTranslation();

	// Don't ask an already logged in user to login over and over again
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			document.location = "/";
		}
	}, []);

	return (
		<div>
			<div className="auth-container">
				<div className="background">
					<div className="shape"></div>
					<div className="shape"></div>
				</div>
				<form action="#" className="login" onSubmit={loginHandler}>
					<h3>{t("login.title")}</h3>
					<label htmlFor="email">{t("login.emailLabel")}</label>
					<input
						type="email"
						placeholder={t("login.emailPlaceholder")}
						name="Email"
						id="email"
						required
					/>

					<label htmlFor="password">{t("login.passwordLabel")}</label>
					<input
						type="password"
						placeholder={t("login.passwordPlaceholder")}
						name="Password"
						id="password"
						required
					/>

					<ul className="login-checkbox">
						<li>
							<label htmlFor="remember">{t("login.rememberLabel")}</label>
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

					<input type="submit" value={t("login.submitButton")} className="button" />

					<div className="logout-redirect">
						<span>{t("login.or")}</span>
						<Link to="/register">{t("login.registerLink")}</Link>
					</div>
				</form>
			</div>
			<footer>
				<div className="footer-content auth-footer">
					<p>{t("footer.text")}</p>
					<a href="https://github.com/velislav088/TimeWallet">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a className="footer-links" href="/welcome">
						{t("footer.home")}
					</a>
				</div>
			</footer>
		</div>
	);

	async function loginHandler(e) {
		e.preventDefault();
		const form_ = e.target;
		const formData = new FormData(form_);
		const dataToSend = {};

		for (const [key, value] of formData) {
			dataToSend[key] = value;
		}

		if (dataToSend.Remember === "on") {
			dataToSend.Remember = true;
		}

		console.log("login data before send: ", dataToSend);
		const response = await fetch("api/timewallet/login", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(dataToSend),
			headers: {
				"content-type": "Application/json",
				Accept: "application/json",
			},
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem("user", dataToSend.Email);
			toast.success(data.message || t("login.successMessage"), {
				autoClose: 1500,
			});
			document.location = "/";
		} else {
			let errorMessage = data.message;
			toast.error(errorMessage);
		}
	}
}

export default Login;
