import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import appLogo2 from '../assets/app logo2.png' 
import { set } from 'mongoose'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      fullName:{
      firstName: firstName,
      lastName: lastName
      },
      email: email,         
      password: password
    })
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="h-screen p-6 flex flex-col justify-between bg-white">
      {/* Logo at Top-Left */}
      <div>
        <img src={appLogo2} alt="Safar Logo" className="w-24 h-24 mb-1" />

        <form onSubmit={submitHandler} className="max-w-md mx-auto">
          <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
          <div className='flex gap-4 mb-6'>
            <input
            required
            className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            required
            className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)
            }
          />
          </div>
          <h3 className="text-lg font-semibold mb-2">What's our Captain's email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-semibold mb-2">Create Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Sign in as Captain Button */}
      <div>
        <p className='text-[10px] text-gray-500 leading-tight'>
        This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy </span> and <span className='underline'>Terms of Service apply </span>.  </p>

      </div>
    </div>
  )
}

export default UserSignup
