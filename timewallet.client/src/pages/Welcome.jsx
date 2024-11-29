import React, { useState, useRef } from "react"
import heroImage from "/src/assets/hero-image.jpg"
import welcomeImage from "/src/assets/welcome-image.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"
import { faTrophy } from "@fortawesome/free-solid-svg-icons"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import GoogleTranslate from "../components/GoogleTranslate"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import velislav from "/src/assets/velislav.png"
import mert from "/src/assets/mert.jpg"

const Welcome = () => {
	const [activeIndex, setActiveIndex] = useState(null)
	const panelRefs = useRef([])

	const toggleAccordion = (index) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
	}

	const getPanelHeight = (index) => {
		if (activeIndex === index && panelRefs.current[index]) {
			return `${panelRefs.current[index].scrollHeight}px`
		}
		return "0px"
	}

	const faqs = [
		{
			question: "What is this app?",
			answer: "This app is a personal finance manager designed to help you track and manage your budgets and expenses in an easy and intuitive way. It allows you to create and manage budgets, monitor your spending, and keep your financial goals on track.",
		},
		{
			question: "Can I track multiple budgets at once?",
			answer: "Absolutely! You can create and manage as many budgets as you like, allowing you to organize your finances by different categories such as 'Food,' 'Entertainment,' or 'Savings.'",
		},
		{
			question: "Can I edit or delete a budget once created?",
			answer: "Yes, you can edit or delete any budget you've created at any time. Simply go to your budget list, select the budget, and choose either to update its details or remove it completely.",
		},
		{
			question: "Do I need an account to use this app?",
			answer: "Yes, you need to sign up for an account to use the app. This helps us securely store your financial data and give you access across devices.",
		},
		{
			question: "How do I create a new budget?",
			answer: "To create a new budget, simply navigate to the budget section and click on 'Add Budget.' You'll be prompted to provide a name for your budget and specify the amount. Once created, you can easily track your spending against it.",
		},
	]
	return (
		<div className="welcome-page">
			<section>
				<div className="first-section-text">
					<h1>
						Save time with{" "}
						<span className="accent">TimeWallet.</span>
					</h1>
					<h3>
						Simplify your finances, budgeting, spending, savings &
						more with real-time tracking, budget insights,
						<b className="accent"> and more.</b>
					</h3>
					<div className="button-box">
						<a className="button" href="/register">
							Get Started
						</a>
						<a className="button button-transparent" href="#sec-2">
							How It Works
						</a>
					</div>
				</div>
				<img
					className="welcome-image"
					src={welcomeImage}
					alt="welcomeImage"
				></img>
			</section>
			<section id="sec-2" className="info-card-section">
				<div className="info-card">
					<h2>Track your spending</h2>
					<h4>
						Get a clear view of your expenses. Easily log and
						categorize your spending to stay on top of your
						finances.
					</h4>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Goal setting and planning</h2>
					<h4>
						Set financial goals and track your progress. Whether
						saving for a vacation or planning for retirement,
						achieve your dreams with our tools.
					</h4>
					<FontAwesomeIcon
						icon={faCalendarCheck}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Set and achieve budgets</h2>
					<h4>
						Create monthly budgets that help you meet your financial
						goals. Track your progress and stay in control.
					</h4>
					<FontAwesomeIcon
						icon={faTrophy}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Plan for the future</h2>
					<h4>
						Save for what matters. Set financial goals and let us
						help you track your path to reaching them.
					</h4>
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						className="info-card-icons"
					/>
				</div>
			</section>
			<section id="FAQ" className="FAQ-section">
				<h1>FAQ</h1>
				{faqs.map((faq, index) => (
					<div className="FAQ-box" key={index}>
						<button
							className={`accordion ${
								activeIndex === index ? "active" : ""
							}`}
							onClick={() => toggleAccordion(index)}
						>
							{faq.question}
						</button>
						<div
							className="panel"
							ref={(el) => (panelRefs.current[index] = el)}
							style={{
								maxHeight: getPanelHeight(index),
								transition: "max-height 0.3s ease",
								overflow: "hidden",
							}}
						>
							<p>{faq.answer}</p>
						</div>
					</div>
				))}
			</section>
			<section id="about-us" className="about-us-section">
				<div className="info-text">
					<h1>About us</h1>
				</div>
				<div className="about-us-info">
					<div className="person-info person-1">
						<img
							className="person"
							src={velislav}
							alt="velislav"
						></img>
						<ul className="about-person">
							<li>
								<h2>Velislav Donchev</h2>
							</li>
							<li>
								Specialist in frontend design, <br /> user
								experience, and React components.
							</li>
						</ul>
					</div>
					<div className="person-info person-2-div">
						<ul className="about-person person-2">
							<li>
								<h2>Mert Elsenev</h2>
							</li>
							<li>
								Developer focusing on the backend <br /> and
								database design.
							</li>
						</ul>
						<img className="person" src={mert} alt="mert"></img>
					</div>
				</div>
			</section>
			<footer>
				<div className="footer-content">
					<p>TimeWallet © 2024 All rights reserved</p>
					<a href="https://github.com/velislav088/TimeWallet">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a className="footer-links" href="/welcome">
						Home
					</a>
				</div>
			</footer>
		</div>
	)
}

export default Welcome
