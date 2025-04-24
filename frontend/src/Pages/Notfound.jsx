import React from "react";
import { motion } from "framer-motion";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-center dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg bg-white p-10 rounded-xl shadow-xl space-y-4 dark:bg-gray-800 dark:text-white"
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
          404 <span role="img" aria-label="error">⚠️</span>
        </h1>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Oops! Page Not Found <span role="img" aria-label="sad face"></span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved. 
          
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Go to Home <span role="img" aria-label="home">🏠</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Notfound;
