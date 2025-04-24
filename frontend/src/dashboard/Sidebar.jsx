import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { MdMenuOpen, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import toast from 'react-hot-toast';

const Sidebar = ({ setComponent }) => {
    const { profile, setisAunthicated } = useAuth();
    const navigateTo = useNavigate();

    const [show, setShow] = useState(false);

    const handleComponents = (value) => {
        setComponent(value);
    }

    const gotoHome = () => {
        navigateTo("/");
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get("http://localhost:4001/api/users/logout", { withCredentials: true });
            setisAunthicated(false);
            toast.success(data.message);
        }
        catch (error) {
            console.log(error);
            alert(error.res.msg || "Failed to logout");
        }
    };

    return (
        <>
            {/* Hamburger Menu (for small screens) */}
            <div className='sm:hidden fixed top-4 left-4 z-50' onClick={() => setShow(!show)}>
                <MdMenuOpen className='text-2xl text-white' />
            </div>

            {/* Sidebar */}
            <div className={`w-72 h-full shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white fixed top-0 left-0 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Close button (for small screens) */}
                <div className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer' onClick={() => setShow(!show)}>
                    <MdOutlineKeyboardDoubleArrowLeft className='text-2xl text-white' />
                </div>

                {/* Profile Section */}
                <div className='text-center p-6'>
                    <img className='w-24 h-24 rounded-full mx-auto mb-2 object-cover border-4 border-white shadow-lg' src={profile?.photo?.url || "https://via.placeholder.com/100"} alt='Profile' />
                    <p className='text-2xl font-semibold'>{profile?.name}</p>
                </div>

                {/* Navigation Links */}
                <ul className='space-y-6 mx-4'>
                    <button onClick={() => handleComponents("My Blogs")} className='w-full px-4 py-3 text-white bg-blue-600 dark:bg-blue-800 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-900 transition duration-300'>
                        My Blogs
                    </button>

                    <button onClick={() => handleComponents("Create Blog")} className='w-full px-4 py-3 text-white bg-green-500 dark:bg-green-700 rounded-lg hover:bg-green-600 dark:hover:bg-green-800 transition duration-300'>
                        Create Blog
                    </button>

                    <button onClick={() => handleComponents("My Profile")} className='w-full px-4 py-3 text-white bg-indigo-600 dark:bg-indigo-800 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-900 transition duration-300'>
                        My Profile
                    </button>

                    <button onClick={gotoHome} className='w-full px-4 py-3 text-white bg-yellow-500 dark:bg-yellow-700 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-800 transition duration-300'>
                        Home
                    </button>

                    <button onClick={handleLogout} className='w-full px-4 py-3 text-white bg-red-600 dark:bg-red-800 rounded-lg hover:bg-red-700 dark:hover:bg-red-900 transition duration-300'>
                        Logout
                    </button>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
