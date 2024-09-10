import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={
                <div>
                    <header>
                        <h1>Not Found</h1>
                    </header>
                    <p>
                        <a href="/">Back to Home</a>
                    </p>
                </div>
            } />
        </Route>
    )
);
function App() {
    const isLogged = localStorage.getItem("user");
    const logout = async () => {
        const response = await fetch("/api/securewebsite/logout", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.removeItem("user");

            alert(data.message);

            document.location = "/login";
        } else {
            console.log("could not logout: ", response);
        }
    };
    return (
        <div>
            <div>
                {
                    isLogged ?
                        <Navbar/>
                        :
                        <h1>test12</h1>
                }               
            </div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;