"use client";
import { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="shadow-lg px-4 py-6 bg-gradient-to-r from-purple-300 to-purple-100 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-white"
    >
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-300 dark:border-gray-700 pb-8">
          {/* Logo + Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-bold text-2xl tracking-wide">
              The <span className="text-orange-500">Daily</span>
              <span className="text-blue-500">Muse</span>
            </div>
            <p className="mt-3 text-sm">
              The Daily Muse inspires us to find beauty in the simplest moments of life.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Services", "Contact"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-purple-700 dark:hover:text-yellow-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p><b>Address:</b> Bihar, Purnea, 854301 India</p>
            <p className="mt-1"><b>Email:</b> info@dailymuse.in</p>
            <p><b>Phone:</b> +91 1111111111111</p>
            <div className="flex space-x-4 mt-4 text-xl">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-purple-700 dark:hover:text-yellow-400 transition">
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-6 flex justify-center items-center flex-wrap gap-4"
        >
          <p className="text-sm  w-full md:w-auto text-center">
            &copy; {new Date().getFullYear()} The Daily Muse. All rights reserved.
          </p>
          
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
