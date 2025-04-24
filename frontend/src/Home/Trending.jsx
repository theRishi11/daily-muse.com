import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from 'framer-motion';

const Trending = () => {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">Trending</h1>
      <Carousel
        responsive={responsive}
        autoPlay={true} // Enable auto carousel
        autoPlaySpeed={3000} // Set the speed of the auto carousel (3 seconds)
        infinite={true} // Make the carousel loop infinitely
        centerMode={true} // Optional: centers the current item
        transitionDuration={500} // Set the transition duration
        swipeable={true} // Allow swipe gesture to change slides
        draggable={true} // Allow drag gesture to change slides
      >
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to={`/blog/${blog._id}`}
                className="group bg-white dark:bg-gray-400 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-400 transition-colors duration-200">
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
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-400">
                      {blog.adminName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Admin</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="flex h-96 items-center justify-center text-3xl font-semibold text-gray-700 dark:text-black">
            Loading...
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
