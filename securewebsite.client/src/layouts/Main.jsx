import React from "react"
import { fetchData } from "../components/helpers"
import { Outlet, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

export function mainLoader() {
	const userName = fetchData("username")
	return { userName }
}

const Main = () => {
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		fetchData(setUserInfo)
	}, [])

	return (
		<div>
			{userInfo.name}
			<Outlet />
		</div>
	)
}

export default Main
