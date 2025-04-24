import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "caabf922-def1-4aab-8e84-2be81947ad21",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent!!");
    } catch (error) {
      console.error(error + "Error during sending msg ");
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center py-16 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-5xl w-full bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            We'd love to hear from you!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            variants={fadeUp}
            custom={1}
            className="w-full md:w-1/2 space-y-5"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm font-medium">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm font-medium">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm font-medium">
                    This field is required
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-purple-700 text-white rounded-xl hover:bg-yellow-500 transition duration-300 font-semibold shadow-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="w-full md:w-1/2 space-y-5"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Contact Information
            </h3>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-500 text-xl" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-pink-500 text-xl" />
                <span>help@thedailymuse.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <span>Bihar, Purnea, India</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
