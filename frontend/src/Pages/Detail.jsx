import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});

  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {blogs && (
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
          >
            <div className="text-purple-600 dark:text-yellow-400 uppercase text-sm font-bold mb-4 tracking-wide">
              {blogs?.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-6">
              {blogs?.title}
            </h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full border-2 border-purple-500 dark:border-yellow-400 mr-4"
              />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {blogs?.adminName}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {blogs?.blogImage?.url && (
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[400px] object-cover rounded-xl shadow-md border border-gray-300 dark:border-gray-700"
                />
              )}
              <div className="md:w-1/2 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {blogs?.about}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default Detail;
