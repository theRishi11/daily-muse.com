import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAunthicated, setisAunthicated] = useState(() => {
    // persist state from localStorage
    return JSON.parse(localStorage.getItem("isAunthicated")) || false;
  });

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs");
      console.log("Fetched blogs:", data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Fetched profile:", data);
      setProfile(data);
      setisAunthicated(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      setisAunthicated(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem("isAunthicated", JSON.stringify(isAunthicated));
  }, [isAunthicated]);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        isAunthicated,
        setisAunthicated,
        setProfile,
        setBlogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
