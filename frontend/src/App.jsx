import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Blogs from './Pages/Blogs'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import { useAuth } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import Creators from './Pages/Creators'
import UpdateBlog from './dashboard/UpdateBlog'
import Detail from './Pages/Detail'
import Notfound from './Pages/Notfound'

const App = () => {
  const location = useLocation();
  const hidenavbarfooter = ["/dashboard","/login","/register"].includes(location.pathname);

  const {blogs,isAunthicated} = useAuth();
  console.log(blogs);
  console.log(isAunthicated);

  return (
    <div>
      {!hidenavbarfooter && <Navbar/>}
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/blogs" element = {<Blogs/>} />
        <Route exact path = "/about" element = {<About/>} />
        <Route exact path = "/contact" element = {<Contact/>} />
        <Route exact path = "/login" element = {<Login/>} />
        <Route exact path = "/register" element = {<Register/>} />
        <Route exact path = "/dashboard" element = {<Dashboard/>} />
        <Route exact path = "/creators" element = {<Creators/>} />
        <Route exact path = "/blog/update/:id" element = {<UpdateBlog/>} />
        <Route exact path = "/blog/:id" element = {<Detail/>} />
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      <Toaster/>
      {!hidenavbarfooter && <Footer/>}
    </div>
  )
}

export default App