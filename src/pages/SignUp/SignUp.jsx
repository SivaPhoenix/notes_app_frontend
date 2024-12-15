import React ,{useState}from 'react'
import Navbar from '../../components/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
function SignUp() {
    const [name,setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState(null)
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name){
            setError("Name is required")
            return;
        }
        if(!validateEmail(email)){
            setError("Please enter a valid email")
            return;
        }
        if(!password){
            setError("Password is required")
            return;
        }
        setError('');

        try {
          const response = await axiosInstance.post("/create-account", {
            fullName:fullName,
            email: email,
            password: password,
          });
    
          if (response.data && response.data.error) {
            setError(response.data.error)
            return;
          }
          if(response.data && response.data.response){
            localStorage.setItem("token", response.data.accessToken)
            navigate('./dashboard')
          }
        } catch (error) {
          // Handle API error response
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError("An error occurred while logging in.");
          }
        }
    }
  return (
    <>
     <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSubmit}> {/* Updated here */}
            <h4 className='text-2xl mb-7'>Sign Up</h4>
            <input
              type='text'
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button className='btn-primary' type='submit'>Create Account</button>
            <p className='text-center mt-5'>
              Already have an account?{" "}
              <Link to='/login' className='font-medium text-primary underline'>
                Login
              </Link>
            </p>
            </form>
            </div>
            </div>
    </>
  )
}

export default SignUp