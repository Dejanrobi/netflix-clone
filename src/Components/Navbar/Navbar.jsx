import React, { useEffect, useState } from 'react'
import { avatar, netflixlogo } from '../../Constants/images';

// Importing its css file
import "./Navbar.css";

const Navbar = () => {
    // Event listener to make the nav menu disapper
    const [show, handleShow] = useState(false);

    // Transition navbar function
    const transitionNavBar = () =>{
        if (window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }

    // Use Effect function
    useEffect(()=>{
        // adding a scroll event listener
        window.addEventListener("scroll", transitionNavBar);
        
        // Cleanup function
        return ()=> window.removeEventListener("scroll", transitionNavBar);
    },[]);

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className="nav__contents">
            <img className='nav__logo' src={netflixlogo} alt="Netflix logo" />
            <img className='nav__avatar' src={avatar} alt="Avatar" />
        </div>
        
    </div>
  )
}

export default Navbar
