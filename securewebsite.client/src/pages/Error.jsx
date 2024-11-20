import { useRouteError, Link, useNavigate } from "react-router-dom"

const Error = () => {
	const error = useRouteError()
	const navigate = useNavigate()

	return (
		<div>
			<h1>Uh oh! We've got a problem.</h1>
			<p>{error.message || error.statusText}</p>
			<div>
				<button onClick={() => navigate(-1)}>
					<span>Go Back</span>
				</button>
				<Link to="/">
					<span>Go home</span>
				</Link>
			</div>
		</div>
	)
}
export default Error
