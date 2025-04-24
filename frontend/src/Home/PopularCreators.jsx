import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PopularCreators = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/admins", {
          withCredentials: true,
        });
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Popular Creators
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Meet the minds behind the trending content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admin?.length > 0 ? (
          admin.slice(0, 4).map((element, index) => (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={"/"} className="flex flex-col items-center p-6 group">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src={element.photo?.url || "/default-image.jpg"}
                    alt="Admin"
                    className="w-full h-full object-cover rounded-full border-4 border-yellow-400 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {element.name || "Unknown Admin"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Admin</p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 dark:text-black text-xl">
            No popular creators found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularCreators;
