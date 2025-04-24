import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";

function Login() {
  const { isAunthicated, setisAunthicated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      toast.success(data.message || "Login successful!");
      setProfile(data);
      setisAunthicated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign in to continue to{" "}
            <span className="text-blue-500 font-semibold">DailyMuse</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md hover:opacity-90 transition-all duration-300 shadow-md"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            New user?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
