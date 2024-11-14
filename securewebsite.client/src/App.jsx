import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom"
import { Route, Link } from "react-router-dom"

// Library
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layouts
import Main from "./layouts/Main"

// Actions
import { deleteBudget } from "./actions/deleteBudget"

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"
import Error from "./pages/Error"
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage"
import ExpensesPage, {
	expensesAction,
	expensesLoader,
} from "./pages/ExpensesPage"
import ProtectedRoutes from "./ProtectedRoutes"
import Profile from "./pages/Profile"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			{/* For logged in users */}
			<Route element={<ProtectedRoutes />}>
				<Route
					path="/"
					element={<Main />}
					errorElement={<Error />}
					children={[
						<Route
							index={true}
							element={<Dashboard />} 
							loader={dashboardLoader} 
							action={dashboardAction} 
							errorElement={<Error />}
						/>,
						<Route path="profile" element={<Profile />} />,
						<Route
							path="budget/:id"
							element={<BudgetPage />}
							loader={budgetLoader}
							action={budgetAction}
							errorElement={<Error />}
							children={[
								<Route path="delete" action={deleteBudget} />,
							]}
						/>,
						<Route
							path="expenses"
							element={<ExpensesPage />}
							loader={expensesLoader}
							action={expensesAction}
							errorElement={<Error />}
						/>,
					]}
				/>
			</Route>

			{/* For new users */}
			<Route path="/welcome" element={<Welcome />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			{/* Error route */}
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
				document.location = "/welcome"
			}, 2000)
		} else {
			console.log("could not logout: ", response)
		}
	}
	return (
		<div className="App">
			<div>
				{isLogged ? (
					<nav>
						<ul className="navbar-left">
							<a className="button" href="/">
								Home
							</a>
						</ul>
						<ul>
							<a className="button" href="/profile">
								Profile
							</a>
							<a className="button button-transparent" onClick={logout}>
								Log Out
							</a>
						</ul>
					</nav>
				) : (
					<nav>
						<ul className="navbar-right">
							<a className="button" href="/login">
								Login
							</a>
							<a className="button button-transparent" href="/register">
								Register
							</a>
						</ul>
					</nav>
				)}
			</div>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	)
}

export default App
