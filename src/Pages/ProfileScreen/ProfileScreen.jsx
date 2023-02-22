import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { avatar } from '../../Constants/images';
import { useAuth } from '../../Context/AuthContext';

// Import css
import "./ProfileScreen.css";

const ProfileScreen = () => {

    const { currentUser, logout, setOverallLoading } = useAuth();

    const navigate = useNavigate();

    // logging out the user
    const handleSingout= async()=>{
        setOverallLoading(true)
        await logout();
        setOverallLoading(false)
        navigate("/")
    }
  return (
    <div className='profileScreen'>
        <Navbar/>
        <div className="profileScreen_body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img src={avatar} alt="" />
                <div className="profileScreen__details">
                    <h2>{currentUser.email}</h2>
                    <div className="profileScreen__plans">

                        <button onClick={handleSingout} className='profileScreen__signout'>Sign Out</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default ProfileScreen
