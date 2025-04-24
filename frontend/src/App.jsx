import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Blogs from './Pages/Blogs';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Creators from './Pages/Creators';
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './Pages/Detail';
import Notfound from './Pages/Notfound';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const { blogs, isAunthicated } = useAuth();

  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={isAunthicated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/blog/:id" element={<Detail />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
