import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

// Flag images
import ukFlag from "../assets/uk.svg"
import bgFlag from "../assets/bulgaria.svg"

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const [language, setLanguage] = useState(i18n.language)

	// Initialize language from localStorage on component mount
	useEffect(() => {
		const savedLanguage = localStorage.getItem("language")
		if (savedLanguage) {
			i18n.changeLanguage(savedLanguage)
			setLanguage(savedLanguage)
		}
	}, [i18n])

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
		setLanguage(lng) // Force re-render
		localStorage.setItem("language", lng) // Save language preference in localStorage
	}

	return (
		<button
			onClick={() => changeLanguage(language === "en" ? "bg" : "en")}
			style={{
				border: "none",
				background: "transparent",
				padding: 0,
				cursor: "pointer",
			}}
		>
			{language === "en" ? (
				<img src={ukFlag} alt="UK Flag" width={30} height={20} />
			) : (
				<img src={bgFlag} alt="Bulgaria Flag" width={30} height={20} />
			)}
		</button>
	)
}

export default LanguageSwitcher
