import React from "react"
import heroImage from "/src/assets/hero-image.jpg"

const Welcome = () => {
	return (
		<section className="welcome-container">
			<div className="content welcome-background">
				<div className="welcome-banner-text">
					<h1>Save time with TimeWallet</h1>
					<div className="subhead">
						Simplify your finances, budgeting, spending, savings &
						more with real-time tracking, budget insights,
						<b> and more.</b>
					</div>
					<div className="welcome-buttons">
						<div className="welcome-button-first">
							<a className="welcome-btn-primary" href="/register">
								Get Started
							</a>
						</div>
						<div className="welcome-button-second">
							<a
								className="welcome-btn-secondary"
								href="/register"
							>
								Placeholder
							</a>
						</div>
					</div>
				</div>
				<div className="welcome-images">
					<div className="primary-image" style={{ display: "block" }}>
						<img
							className="pr-image"
							src={heroImage}
							alt
							width="1850"
							height="1598"
						></img>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Welcome
