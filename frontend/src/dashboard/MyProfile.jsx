import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center py-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden max-w-lg w-full">
        {/* Profile Cover Image */}
        <div className="relative">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/150"}
            alt="Cover"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          {/* Profile Image */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              src={profile?.photo?.url || "https://via.placeholder.com/100"}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 py-8 text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {profile?.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            {profile?.email}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            {profile?.phone || "No phone number provided"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            {profile?.role || "No role specified"}
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => alert("Edit Profile functionality")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
