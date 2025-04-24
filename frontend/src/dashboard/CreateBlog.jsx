import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    try {
      const response = await fetch("http://localhost:4001/api/blogs/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();

      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.message || "Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          Create Your Blog
        </h3>
        
        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category Input */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter your blog category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Blog Image Input */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Blog Image
            </label>
            <div className="flex justify-center mb-4">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Blog Preview"
                className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* About Input */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              About
            </label>
            <textarea
              rows="6"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none transition-colors duration-200"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
