import React from 'react'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Tech from '../Home/Tech'
import PopularCreators from '../Home/PopularCreators'

const Home = () => {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Hero />
      <Trending />
      <Tech />
      <PopularCreators />
    </div>
  )
}

export default Home
