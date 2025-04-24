import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function Blogs() {
  const { blogs } = useAuth();

  return (
    <section className="bg-gradient-to-br mt-12 from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-purple-900 dark:text-purple-200 mb-4"
        >
          Explore Our Latest Blogs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
        >
          The world of blogging empowers voices, inspires ideas, and connects communities across industries.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Link
                  to={`/blog/${blog._id}`}
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h2 className="text-xl font-semibold drop-shadow-md">{blog?.title}</h2>
                    <p className="text-sm font-medium text-pink-300">{blog?.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">No blogs available at the moment.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Blogs;
