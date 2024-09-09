import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    document.title = "Register";

    // dont ask an already registered user to register over and over again
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

    return (
            <div className='auth-container'>
                <div className='background'>
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form action="#" className='register' onSubmit={registerHandler}>
                        <p className='message'></p>
                        <h3>Register Here</h3>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Name' name='Name' id='name' required />

                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' name='Email' id='email' required />

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' name='PasswordHash' id='password' required />
                        
                        <input type="submit" value="Register" className='button' />

                        <span>Or </span>
                        <Link to='/login'>Login</Link>              
                </form>
            </div>
    );
    async function registerHandler(e) {
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter), dataToSend = {};

        for (const [key, value] of formData) {
            dataToSend[key] = value;
        }

        // create username
        const newUserName = dataToSend.Name.trim().split(" ");
        dataToSend.UserName = newUserName.join("");

        const response = await fetch("api/securewebsite/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type": "Application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.location = "/login";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            let errorMessages = "<div>Attention please:</div><div class='normal'>";
            data.errors.forEach(error => {
                errorMessages += error.description + " ";
            });

            errorMessages += "</div>";
            messageEl.innerHTML = errorMessages;
        }

        console.log("login error: ", data);
    }
}

export default Register;