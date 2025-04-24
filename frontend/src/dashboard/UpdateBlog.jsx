import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  // Handle image preview and file selection
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  // Fetch the blog data on load
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setBlogImage(data?.blogImage?.url || "");
        setBlogImagePreview(data?.blogImage?.url || "");
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog data");
      }
    };
    fetchBlog();
  }, [id]);

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // Only append blogImage if it's a new File
    if (blogImage && blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update blog"
      );
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl transition-colors">
        <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Update Blog</h3>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Category Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input
              type="text"
              placeholder="Enter blog category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
            />
          </div>

          {/* Blog Image Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Blog Image</label>
            <div className="relative mb-4">
              <img
                src={blogImagePreview || blogImage || "/imgPL.webp"}
                alt="Blog Main"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <input
                type="file"
                onChange={changePhotoHandler}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* About Textarea */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">About</label>
            <textarea
              rows="6"
              placeholder="Describe your blog (minimum 200 characters)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Update Blog
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
