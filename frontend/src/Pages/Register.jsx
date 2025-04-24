import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const { isAunthicated, setisAunthicated, setProfile } = useAuth();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const res = await fetch("http://localhost:4001/api/users/register", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to register");
      }
      const data = await res.json();
      alert("Registered successfully!");
      setProfile(data);
      setisAunthicated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhotoPreview("");
      setPhoto("");
      navigateTo("/");
    } catch (error) {
      console.error(error);
      alert("Failed to register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div className="text-center mb-6">
          <div className="font-semibold text-3xl text-blue-500">
            <span className="text-orange-500">The</span>
            <span className="text-blue-600">Daily</span>
            <span className="text-purple-500">Muse</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-3">
            Create Your Account
          </h2>
        </div>

        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                type="file"
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={changePhotoHandler}
              />
              <div className="absolute top-4 right-4">
                <img
                  src={photoPreview ? URL.createObjectURL(photo) : ""}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 font-semibold">
                  Login here
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
