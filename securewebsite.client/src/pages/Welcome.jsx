import React from "react"
import heroImage from "/src/assets/hero-image.jpg"
import welcomeImage from "/src/assets/welcome-image.jpg"

const Welcome = () => {
	return (
		<section>
			<div className="first-section-text">
				<h1>
					Save time with <span className="accent">TimeWallet.</span>
				</h1>
				<h3>
					Simplify your finances, budgeting, spending, savings & more
					with real-time tracking, budget insights,
					<b className="accent"> and more.</b>
				</h3>
				<div className="button-box">
					<a className="button">Get Started</a>
					<a className="button button-transparent" href="/register">
						How It Works
					</a>
				</div>
			</div>
			<img className="welcome-image" src={welcomeImage} alt></img>
		</section>
	)
}

export default Welcome
