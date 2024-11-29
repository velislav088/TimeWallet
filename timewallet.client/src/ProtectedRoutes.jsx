import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"

function ProtectedRoutes() {
	const [isLogged, setIsLogged] = useState(false)
	const [waiting, setWaiting] = useState(true)

	useEffect(() => {
		fetch("/api/timewallet/xhtlekd/", {
			method: "GET",
			credentials: "include",
		})
			.then((response) => {
				if (response.ok) {
					setWaiting(false)
					setIsLogged(true)
				}
				return response.json()
			})
			.then((data) => {
				localStorage.setItem("user", data.user.email)
			})
			.catch((err) => {
				console.log("Error protected routes: ", err)
				setWaiting(false)
				localStorage.removeItem("user")
			})
	}, [])

	return waiting ? (
		<div className="loader-parent">
			<div className="loader"></div>
		</div>
	) : isLogged ? (
		<Outlet />
	) : (
		<Navigate to="/welcome" />
	)
}

export default ProtectedRoutes
