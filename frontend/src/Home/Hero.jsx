import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10 mt-12">
      {blogs && blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.slice(0, 4).map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                to={`/blog/${blog._id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-[1.03] transition duration-300"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-400 transition-colors duration-300">
                    {blog.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4 p-5">
                  <img
                    src={blog.adminPhoto}
                    alt={blog.adminName}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div>
                    <p className="text-xl font-medium text-gray-800 dark:text-white">
                      {blog.adminName}
                    </p>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center text-xl font-semibold text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Hero;
