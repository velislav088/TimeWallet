import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Link,
} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
import Home, { homeLoader } from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Main, { mainLoader } from "./layouts/Main"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Welcome from "./pages/Welcome"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<ProtectedRoutes />}>
				<Route
					path="/"
					element={<Main />}
					loader={mainLoader}
					children={[
						<Route
							index={true}
							element={<Home />}
							loader={homeLoader}
						/>,
					]}
				/>
				<Route path="/admin" element={<Admin />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
			<Route path="/welcome" element={<Welcome />} />
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
							<Link to="/">Back to Home</Link>
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

			toast.success(data.message || "Logged out successfully", {
				autoClose: 1500, // 1.5-second auto close
			})
			setTimeout(() => {
				document.location = "/login"
			}, 2000)
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
			<ToastContainer />
		</div>
	)
}

export default App
