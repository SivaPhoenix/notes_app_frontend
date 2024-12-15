import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    // Clear previous error
    setError(null);

    // Call login API
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle API error response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSubmit}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input
              type='text'
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button className='btn-primary' type='submit'>Login</button>
            <p className='text-center mt-5'>
              Don't have an account?{" "}
              <Link to='/signup' className='font-medium text-primary underline'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
