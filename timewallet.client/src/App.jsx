import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom"
import { Route, Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Main from "./layouts/Main"
import { deleteBudget } from "./actions/deleteBudget"
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
import logoImage from "/src/assets/logo-image.svg"
import LanguageSwitcher from "./components/LanguageSwitcher"
import { useTranslation } from "react-i18next"

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
							key="dashboard"
							index={true}
							element={<Dashboard />}
							loader={dashboardLoader}
							action={dashboardAction}
							errorElement={<Error />}
						/>,
						<Route
							key="profile"
							path="profile"
							element={<Profile />}
						/>,
						<Route
							key="budget"
							path="budget/:id"
							element={<BudgetPage />}
							loader={budgetLoader}
							action={budgetAction}
							errorElement={<Error />}
							children={[
								<Route
									key="delete-budget"
									path="delete"
									action={deleteBudget}
								/>,
							]}
						/>,
						<Route
							key="expenses"
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
	const { t } = useTranslation()

	const logout = async () => {
		const response = await fetch("/api/timewallet/logout", {
			method: "GET",
			credentials: "include",
		})

		const data = await response.json()
		if (response.ok) {
			localStorage.removeItem("user")

			toast.success(data.message || "Logged out successfully", {
				autoClose: 1500,
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
							<a href="/">
								<img
									className="logo"
									src={logoImage}
									alt="TimeWallet"
								></img>
							</a>
						</ul>
						<ul>
							<LanguageSwitcher />
							<a className="button" href="/profile">
								{t("navbar.profile")}
							</a>
							<a
								className="button button-transparent"
								onClick={logout}
							>
								{t("navbar.logout")}
							</a>
						</ul>
					</nav>
				) : (
					<nav>
						<ul className="navbar-left">
							<a href="/">
								<img
									className="logo"
									src={logoImage}
									alt="TimeWallet"
								></img>
							</a>
						</ul>
						<ul className="navbar-right">
							<LanguageSwitcher />
							<a className="button" href="/login">
								{t("navbar.login")}
							</a>
							<a
								className="button button-transparent"
								href="/register"
							>
								{t("navbar.register")}
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
