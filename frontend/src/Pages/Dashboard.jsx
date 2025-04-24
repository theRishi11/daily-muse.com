import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import CreateBlog from '../dashboard/CreateBlog';
import UpdateBlog from '../dashboard/UpdateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { profile, isAunthicated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  // Redirect if not authenticated
  if (!isAunthicated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar setComponent={setComponent} />

        {/* Dashboard Content */}
        <div className="flex-1 p-6 sm:ml-64 transition-all duration-300">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-3xl font-semibold text-gray-800 dark:text-white"></div>

            {/* Profile Information */}
            <div className="flex items-center space-x-4">
              <img
                src={profile?.photo?.url || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
              />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">{profile?.name}</span>
            </div>
          </div>

          {/* Component Display */}
          <div className="transition-all duration-500">
            {component === "My Profile" ? (
              <MyProfile />
            ) : component === "Create Blog" ? (
              <CreateBlog />
            ) : component === "Update Blog" ? (
              <UpdateBlog />
            ) : (
              <MyBlogs />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
