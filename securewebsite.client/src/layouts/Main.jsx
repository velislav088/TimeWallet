import { Outlet, useLoaderData } from "react-router-dom"
import { fetchData } from "../helpers"

const Main = () => {
	return (
		<div className="layout">
			<main>
				<Outlet />
			</main>
		</div>
	)
}
export default Main
