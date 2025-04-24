import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { motion } from 'framer-motion';

const Tech = () => {
  const { blogs } = useAuth();
  const techBlogs = blogs?.filter((blog) => blog.category === 'Tech');

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Technology Blogs
      </h1>
      <p className="text-center mb-8 text-lg text-gray-600 dark:text-gray-400">
        Explore the latest in technology with these insightful blogs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {techBlogs && techBlogs.length > 0 ? (
          techBlogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/blog/${blog._id}`} className="block">
                <img
                  src={blog?.blogImage?.url}
                  alt={blog.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-sm">{blog.category}</p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="flex h-96 items-center justify-center text-3xl font-semibold text-gray-700 dark:text-black">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Tech;
