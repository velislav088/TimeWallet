import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Register() {
	document.title = "Register";
	const { t } = useTranslation();

	// Don't ask an already registered user to register over and over again
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			document.location = "/";
		}
	}, []);

	return (
		<div className="auth-container">
			<div className="background">
				<div className="shape"></div>
				<div className="shape"></div>
			</div>
			<form action="#" className="register" onSubmit={registerHandler}>
				<h3>{t("register.title")}</h3>
				<label htmlFor="name">{t("register.nameLabel")}</label>
				<input
					type="text"
					placeholder={t("register.namePlaceholder")}
					name="Name"
					id="name"
					required
				/>

				<label htmlFor="email">{t("register.emailLabel")}</label>
				<input
					type="email"
					placeholder={t("register.emailPlaceholder")}
					name="Email"
					id="email"
					required
				/>

				<label htmlFor="password">{t("register.passwordLabel")}</label>
				<input
					type="password"
					placeholder={t("register.passwordPlaceholder")}
					name="PasswordHash"
					id="password"
					required
				/>

				<input type="submit" value={t("register.submitButton")} className="button" />

				<div className="logout-redirect">
					<span>{t("register.or")}</span>
					<Link to="/login">{t("register.loginLink")}</Link>
				</div>
			</form>
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

	async function registerHandler(e) {
		e.preventDefault();
		const form_ = e.target;
		const formData = new FormData(form_);
		const dataToSend = {};

		for (const [key, value] of formData) {
			dataToSend[key] = value;
		}

		// Create username
		const newUserName = dataToSend.Name.trim().split(" ");
		dataToSend.UserName = newUserName.join("");

		const response = await fetch("api/timewallet/register", {
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
			toast.success(data.message || t("register.successMessage"), {
				autoClose: 1500,
			});
			setTimeout(() => {
				document.location = "/login";
			}, 2000);
		}

		if (data.message) {
			toast.error(data.message);
		} else {
			let errorMessages = "";
			data.errors.forEach((error) => {
				errorMessages = error.description;
				toast.error(errorMessages);
			});
		}

		console.log("register error: ", data);
	}
}

export default Register;

