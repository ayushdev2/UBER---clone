import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import appLogo3 from '../assets/app logo3.png' 

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [CaptainData, setCaptainData] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      email: email,
      password: password  
    })
    setEmail('')
    setPassword('')
  }

  return (
    <div className="h-screen p-6 flex flex-col justify-between bg-white">
      {/* Logo and Form */}
      <div>
        <img src={appLogo3} alt="Safar Logo" className="w-24 h-24 mb-2" />

        <form onSubmit={submitHandler} className="max-w-md">
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center text-base">
            Join a fleet?{' '}
            <Link to="/captainsignup" className="text-blue-600 hover:underline">
              Register as Captain
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom switch button */}
      <div>
        <Link
          to="/Login"
          className="bg-[#f3c164] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
