import React from 'react'
import Banner from '../../Components/Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';
// Importing the css file
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className='homescreen'>
      
      {/* Navbar */}
      <Navbar/>
      
      {/* Banner */}
      <Banner/>

      {/* Rows */}
    </div>
  )
}

export default HomeScreen
