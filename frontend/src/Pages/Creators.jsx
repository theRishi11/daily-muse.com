import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Creators = () => {
  const [creator, setCreator] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/admins", {
          withCredentials: true,
        });
        setCreator(data);
      } catch (error) {
        console.error("Error fetching Creators:", error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="min-h-screen mt-14 px-6 py-10 bg-gradient-to-br from-purple-100 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Meet Our Creators
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {creator?.length > 0 ? (
            creator.map((element, i) => (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={i}
                key={element._id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
              >
                <Link to="/creators" className="block p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <img
                      src={element.photo?.url || "/default-image.jpg"}
                      alt="Creator"
                      className="w-32 h-32 object-cover rounded-full border-4 border-purple-400 dark:border-purple-600 shadow-md"
                    />
                  </div>
                  <div className="text-gray-800 dark:text-white">
                    <p className="text-xl font-semibold mb-1">
                      {element.name || "Unknown Creator"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {element.role || "Creator"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {element.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {element.phone}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
              No creators found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creators;
