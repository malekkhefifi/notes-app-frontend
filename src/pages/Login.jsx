import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';  // Ensure the import name matches the component's actual name
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic 
    if (!validateEmail(email)) {  // Corrected negation syntax
      setError("Please enter a valid email address.");  // Corrected setError syntax
      return;
    }
    if (!password) {
      setError("Please enter a password.");  // Corrected setError syntax
      return;
    }
    setError('');
    console.log('User logged in:', { email, password });


    /***********************login API call */
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Correct syntax
        navigate("/dashboard"); // Ensure you're using it properly inside the component
      }
    } catch (error) {
      // Log full error object for debugging
      console.log("Login failed:", error); // This will show all error details

      if (error.response) {
        console.log("Error response data:", error.response.data); // Log the response data
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Set error from response
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }


  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}

            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet? {' '}
              <Link to="/SignUp" className="text-blue-500 font-medium underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

