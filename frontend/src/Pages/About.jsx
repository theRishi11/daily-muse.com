import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <section className="bg-gradient-to-b from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-20 mt-0.5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl font-extrabold text-center text-purple-900 dark:text-purple-300 mb-10 tracking-tight"
        >
          About <span className="text-orange-500">The Daily Muse</span> Blogs
        </motion.h1>

        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex justify-center"
          >
            <img
              src="/blog-team.jpg"
              alt="Our Team"
              className="rounded-2xl shadow-2xl object-cover w-full max-w-md"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              variants={textVariants}
              className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed tracking-wide"
            >
              Welcome to <span className="font-bold text-purple-800 dark:text-white">The Daily Muse Blogs</span> —
              your go-to destination for inspiring stories, insightful articles, and engaging discussions across
              lifestyle, business, and personal development. Our creative writers bring fresh perspectives every day.
            </motion.p>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              variants={textVariants}
              className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed tracking-wide"
            >
              <span className="font-bold text-purple-800 dark:text-white">The Daily Muse Blogs</span> dives deep
              into the evolving world of business. We deliver impactful ideas, practical strategies, and thought-provoking commentary to empower startups, creators, and professionals in the modern digital landscape.
            </motion.p>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex justify-center"
          >
            <img
              src="/blog1.avif"
              alt="Business Insights"
              className="rounded-2xl shadow-2xl object-cover w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
