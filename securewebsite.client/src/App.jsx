import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Link,
} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<ProtectedRoutes />}>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="*"
				element={
					<div>
						<header>
							<h1>Not Found</h1>
						</header>
						<p>
							<a href="/">Back to Home</a>
						</p>
					</div>
				}
			/>
		</Route>
	)
)
function App() {
	const isLogged = localStorage.getItem("user")
	const logout = async () => {
		const response = await fetch("/api/securewebsite/logout", {
			method: "GET",
			credentials: "include",
		})

		const data = await response.json()
		if (response.ok) {
			localStorage.removeItem("user")

			alert(data.message)

			document.location = "/login"
		} else {
			console.log("could not logout: ", response)
		}
	}
	return (
		<div>
			<div>
				{isLogged ? (
					<span className="navbar">
						<ul className="navbar-left">
							<a className="button" href="/">
								Home
							</a>
						</ul>
						<ul>
							<a className="button" href="/profile">
								Profile
							</a>
							<a className="button" onClick={logout}>
								Log Out
							</a>
						</ul>
					</span>
				) : (
					<span className="navbar">
						<ul>
							<a className="button" href="/login">
								Login
							</a>
							<a className="button" href="/register">
								Register
							</a>
						</ul>
					</span>
				)}
			</div>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
