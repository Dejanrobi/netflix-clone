import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { avatar, netflixlogo } from '../../Constants/images';
import { useAuth } from '../../Context/AuthContext';

// Importing its css file
import "./Navbar.css";

const Navbar = () => {
    // Event listener to make the nav menu disapper
    const [show, handleShow] = useState(false);
    const [updateProfileDiv, setUpdateProfileDiv] = useState(false)

    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    // Transition navbar function
    const transitionNavBar = () =>{
        if (window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }

    // Logout
    const handleLogout=()=>{
        logout()
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
            <div className='profileDet'>
                <div className='profileName'>
                    {currentUser.displayName}
                </div>
                
                <img className='nav__avatar' src={currentUser.photoURL?currentUser.photoURL:avatar} alt="Avatar" onClick={()=>{setUpdateProfileDiv(!updateProfileDiv)}} />
            
                {
                    updateProfileDiv && (
                        <div className='setProfile'>
                            <div className='uprof' onClick={()=>{navigate("/update-profile")}}>
                                Update Profile
                            </div>
                            
                            <div className='uprof' onClick={handleLogout}>
                                Log Out
                            </div>

                        </div>

                    )
                }
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Navbar
