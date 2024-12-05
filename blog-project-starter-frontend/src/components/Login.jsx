import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../config/firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';//signed In user will be able to login

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errormessage, setErrorMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged((user) => {
            if (user) {
                //user was logged in means directly redirect to home page, again don't show login page
                navigate("/home")
            }
        })

    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        //here use try catch method to handle post... error 
        //if signedIn email & password given in login page, it will redirect to home page otherwise it throw error
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            navigate("/home");
        }).catch(() => {
            setErrorMessage("Error Signing in Please try again")
        })

        // Simulate login process
        console.log('User logged in:', { email, password });

        // Redirect to homepage/dashboard after login
        // Replace '/home' with your homepage route
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-10 bg-white rounded-lg shadow-md" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-red-600 cursor-pointer my-2'>{errormessage}</p>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
