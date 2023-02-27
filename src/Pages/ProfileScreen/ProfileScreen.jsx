import { doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import PlanScreen from '../../Components/PlanScreen/PlanScreen';
import { avatar } from '../../Constants/images';
import { useAuth } from '../../Context/AuthContext';

import { firestoreDb } from '../../firebase';

// Import css
import "./ProfileScreen.css";

const ProfileScreen = () => {

    const testRef = useRef(null);

    const { currentUser, logout, setOverallLoading } = useAuth();

    const navigate = useNavigate();

    // logging out the user
    const handleSingout= async()=>{
        setOverallLoading(true)
        await logout();
        setOverallLoading(false)
        // navigate("/")
    }

    // A function to upload to firestore
    
  return (
    <div className='profileScreen'>
        <Navbar/>
        <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img src={avatar} alt="" />
                <div className="profileScreen__details">
                    <h2>{currentUser.email}</h2>
                    <div className="profileScreen__plans">
                        <h3>Plans</h3>
                        
                        <PlanScreen/>
                        <button onClick={handleSingout} className='profileScreen__signout'>Sign Out</button>
                    </div>

                    
                </div>

            </div>

        </div>
    </div>
  )
}

export default ProfileScreen
