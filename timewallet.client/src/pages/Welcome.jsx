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
			question: "Какво представлява това приложение?",
			answer: "Това приложение е личен финансов мениджър, предназначен да ви помогне да проследявате и управлявате своите бюджети и разходи по лесен и интуитивен начин. Тя ви позволява да създавате и управлявате бюджети, да наблюдавате разходите си и да поддържате финансовите си цели на път.",
		},
		{
			question: "Мога ли да проследявам няколко бюджета наведнъж?",
			answer: "Абсолютно! Можете да създавате и управлявате толкова бюджети, колкото желаете, което ви позволява да организирате финансите си по различни категории като „Храна“, „Развлечения“ или „Спестявания“.",
		},
		{
			question: "Мога ли да изтрия бюджет, веднъж създаден?",
			answer: "Да, можете да изтриете всеки бюджет, който сте създали по всяко време. Просто отидете на вашия списък с бюджети, изберете бюджета и изберете да го премахнете напълно.",
		},
		{
			question:
				"Имам ли нужда от акаунт, за да използвам това приложение?",
			answer: "Да, трябва да се регистрирате за акаунт, за да използвате приложението. Това ни помага да съхраняваме сигурно вашите финансови данни и да ви предоставя достъп на различни устройства.",
		},
		{
			question: "Как да създам нов бюджет?",
			answer: "За да създадете нов бюджет, просто отидете до раздела с бюджета и щракнете върху „Добавяне на бюджет“. Ще бъдете подканени да въведете име за вашия бюджет и да посочите сумата. Веднъж създаден, можете лесно да проследявате разходите си спрямо него.",
		},
	]
	return (
		<div className="welcome-page">
			<section>
				<div className="first-section-text">
					<h1>
						Спести време с{" "}
						<span className="accent">TimeWallet.</span>
					</h1>
					<h3>
						Опростете вашите финанси, планиране, разходи,
						спестявания и повече с проследяване в реално време,
						информация за бюджета,
						<b className="accent"> и още.</b>
					</h3>
					<div className="button-box">
						<a className="button" href="/register">
							Започнете
						</a>
						<a className="button button-transparent" href="#sec-2">
							Как Работи
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
					<h2>Проследявайте разходите си</h2>
					<h4>
						Получете ясна представа за вашите разходи. Лесно влизане
						и категоризирайте разходите си, за да сте в крак свашите
						финанси.
					</h4>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Поставяне на цели и планиране</h2>
					<h4>
						Поставете си финансови цели и следете напредъка си. Дали
						спестяване за ваканция или планиране на пенсиониране,
						постигнете мечтите си с нашите инструменти.
					</h4>
					<FontAwesomeIcon
						icon={faCalendarCheck}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Определете и постигнете бюджети</h2>
					<h4>
						Създавайте месечни бюджети, които ви помагат да
						покривате финансовите си разходи цели. Проследявайте
						напредъка си и поддържайте контрол.
					</h4>
					<FontAwesomeIcon
						icon={faTrophy}
						className="info-card-icons"
					/>
				</div>
				<div className="info-card">
					<h2>Планирайте бъдещето</h2>
					<h4>
						Спестете за това, което има значение. Поставете си
						финансови цели и ни позволете да ви помогне да
						проследите пътя си към достигането им.
					</h4>
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						className="info-card-icons"
					/>
				</div>
			</section>
			<section id="FAQ" className="FAQ-section">
				<h1>ЧЗВ</h1>
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
					<h1>За Нас</h1>
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
								<h2>Велислав Дончев</h2>
							</li>
							<li>
								Специалист по фронтенд дизайн, <br /> потребителски
								интерфейс и React компоненти.
							</li>
						</ul>
					</div>
					<div className="person-info person-2-div">
						<ul className="about-person person-2">
							<li>
								<h2>Мерт Елсенев</h2>
							</li>
							<li>
								Разработчик, който се фокусира върху бекенда{" "}
								<br /> и дизайн на база данни.
							</li>
						</ul>
						<img className="person" src={mert} alt="mert"></img>
					</div>
				</div>
			</section>
			<footer>
				<div className="footer-content">
					<p>TimeWallet © 2024 Всички права запазени</p>
					<a href="https://github.com/velislav088/TimeWallet">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a className="footer-links" href="/welcome">
						Начало
					</a>
				</div>
			</footer>
		</div>
	)
}

export default Welcome
