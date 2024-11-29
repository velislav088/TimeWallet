import { useRouteError, Link, useNavigate } from "react-router-dom"

const Error = () => {
	const error = useRouteError()
	const navigate = useNavigate()

	return (
		<div>
			<h1>Имаме проблем...</h1>
			<p>{error.message || error.statusText}</p>
			<div>
				<button onClick={() => navigate(-1)}>
					<span>Върни се</span>
				</button>
				<Link to="/">
					<span>Към началото</span>
				</Link>
			</div>
		</div>
	)
}
export default Error
