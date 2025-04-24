import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const navigateTo = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      navigateTo("/");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="pt-10 px-4 lg:pl-[240px] min-h-screen bg-gray-50 dark:bg-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          My Blogs
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <Link
                to={`/blog/${element._id}`}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
                key={element._id}
              >
                {element?.blogImage?.url && (
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{element.category}</p>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {element.title}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-600 dark:text-blue-400 border border-blue-500 dark:border-blue-400 px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-600 transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-600 dark:text-red-400 border border-red-500 dark:border-red-400 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg">
              You have not posted any blogs yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
