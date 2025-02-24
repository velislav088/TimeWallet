import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import heroImage from "/src/assets/hero-image.jpg"
import welcomeImage from "/src/assets/welcome-image.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faMagnifyingGlass,
	faTrophy,
	faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons"
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import velislav from "/src/assets/velislav.png"
import mert from "/src/assets/mert.jpg"
import LanguageSwitcher from "../components/LanguageSwitcher"

const Welcome = () => {
	const { t } = useTranslation()
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
		{ question: t("faq.q1"), answer: t("faq.a1") },
		{ question: t("faq.q2"), answer: t("faq.a2") },
		{ question: t("faq.q3"), answer: t("faq.a3") },
		{ question: t("faq.q4"), answer: t("faq.a4") },
		{ question: t("faq.q5"), answer: t("faq.a5") },
	]

	return (
		<div className="welcome-page">
			<section>
				<div className="first-section-text">
					<h1>{t("hero.title")}</h1>
					<h3>{t("hero.subtitle")}</h3>
					<div className="button-box">
						<a className="button" href="/register">
							{t("hero.getStarted")}
						</a>
						<a className="button button-transparent" href="#sec-2">
							{t("hero.howItWorks")}
						</a>
					</div>
				</div>
				<img
					className="welcome-image"
					src={welcomeImage}
					alt="welcomeImage"
				/>
			</section>

			<section id="sec-2" className="info-card-section">
				<div className="info-card">
					<h2>{t("info.trackSpending.title")}</h2>
					<h4>{t("info.trackSpending.text")}</h4>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>{t("info.goalSetting.title")}</h2>
					<h4>{t("info.goalSetting.text")}</h4>
					<FontAwesomeIcon
						icon={faCalendarCheck}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>{t("info.achieveBudgets.title")}</h2>
					<h4>{t("info.achieveBudgets.text")}</h4>
					<FontAwesomeIcon
						icon={faTrophy}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>{t("info.planFuture.title")}</h2>
					<h4>{t("info.planFuture.text")}</h4>
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						className="info-card-icons"
					/>
				</div>
			</section>

			<section id="FAQ" className="FAQ-section">
				<h1>{t("faq.title")}</h1>
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
					<h1>{t("aboutUs.title")}</h1>
				</div>
				<div className="about-us-info">
					<div className="person-info person-1">
						<img className="person" src={velislav} alt="velislav" />
						<ul className="about-person">
							<li>
								<h2>{t("aboutUs.person1.name")}</h2>
							</li>
							<li>{t("aboutUs.person1.role")}</li>
						</ul>
					</div>
					<div className="person-info person-2-div">
						<ul className="about-person person-2">
							<li>
								<h2>{t("aboutUs.person2.name")}</h2>
							</li>
							<li>{t("aboutUs.person2.role")}</li>
						</ul>
						<img className="person" src={mert} alt="mert" />
					</div>
				</div>
			</section>

			<footer>
				<div className="footer-content">
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
	)
}

export default Welcome
