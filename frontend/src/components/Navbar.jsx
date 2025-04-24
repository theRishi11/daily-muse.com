import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import { TiThMenuOutline } from "react-icons/ti"
import { IoCloseCircle } from "react-icons/io5"
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { blogs, profile, isAunthicated, setisAunthicated } = useAuth()
  const [show, setShow] = useState(false)
  const navigateTo = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", { withCredentials: true })
      setisAunthicated(false)
      toast.success(data.message)
    } catch {
      toast.error("Failed to logout")
    }
  }

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "BLOGS", path: "/blogs" },
    { label: "CREATORS", path: "/creators" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ]

  return (
    <nav className="bg-white  dark:bg-gray-900 shadow-md px-4 py-3 fixed w-full z-50 top-0 transition duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          The <span className="text-orange-500">Daily</span><span className="text-blue-500">Muse</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} className="hover:text-teal-500 transition">
              {label}
            </Link>
          ))}
        </ul>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex space-x-2 ml-4">
          {isAunthicated && profile?.role === "admin" && (
            <Link to="/dashboard" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
              Dashboard
            </Link>
          )}
          {!isAunthicated ? (
            <Link to="/login" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-gray-700 dark:text-white" onClick={() => setShow(!show)}>
          {show ? <IoCloseCircle size={28} /> : <TiThMenuOutline size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-40 space-y-6 text-lg text-gray-800 dark:text-gray-100 font-medium"
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setShow(false)}
                className="hover:text-teal-500 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}

            {isAunthicated && profile?.role === 'admin' && (
              <Link
                to="/dashboard"
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Dashboard
              </Link>
            )}

            {isAunthicated ? (
              <button
                onClick={(e) => {
                  setShow(false)
                  handleLogout(e)
                }}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
