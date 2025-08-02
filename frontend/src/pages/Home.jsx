import React from 'react'
import { Link } from 'react-router-dom' // <-- import Link
import appLogo from '../assets/app logo.png'
import appimage from '../assets/app image.png'

const Home = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-between"
      style={{
        backgroundImage: `url(${appimage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top -60px',
      }}
    >
      {/* Top Logo */}
      <div className="pt-6 px-6">
        <img src={appLogo} alt="Safar Logo" className="w-16" />
      </div>

      {/* Bottom Section */}
      <div className="bg-white p-6 rounded-t-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Get Started with Safar
        </h2>

        {/* Link to login */}
        <Link
          to="/login"
          className="w-full block bg-black text-white text-center py-3 rounded text-lg font-medium"
        >
          continue
        </Link>
      </div>
    </div>
  )
}

export default Home
