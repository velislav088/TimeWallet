import React from "react"
import header from "../assets/hero-image.jpg"

const Welcome = () => {
	return (
		<div className="welcome-container">
			<div className="welcome-text">
				<h1>Save time with TimeWallet</h1>
				<p>
					Simplify your financial life with real-time tracking, budget
					insights, and more.
				</p>
				<a className="button" href="/register">
					Get Started
				</a>
			</div>
			<div>
				<img src={header} alt="header" className="header-image" />
			</div>
		</div>
	)
}

export default Welcome
