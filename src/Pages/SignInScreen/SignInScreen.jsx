import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


import "./SignInScreen.css";
import SignUpScreen from '../SingUpScreen/SignUpScreen';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


const SignInScreen = () => {
  const signUpemailRef = useRef(null);
  const signUppasswordRef = useRef(null);
  const signUpnameRef = useRef("Jane");
  const signInemailRef = useRef(null);
  const signInpasswordRef = useRef(null);
  
  const navigate = useNavigate();

  // obtaining the startEmail
  const { startEmail } = useAuth();

  

  return (
    <div className='signInLogin'>
      <div className='signInScreen'>
     
        <form className='signInformElements' action="">
            <h3>Sign In</h3>          
            <input ref={signInemailRef} type="email" placeholder='Email' defaultValue={startEmail} />
            <input ref={signInpasswordRef} type="password" placeholder='Password' />
            <button type='submit' >Sign In</button> 
              
            <div className='goToSignIn'>
              <p>New to Netflix? </p> 
              <p className='signIn' onClick={()=>{
                navigate("/signup")

              }} >Sign Up Now</p>
              
            </div>
        </form>
      </div>      
    </div>
    
    
  )
}

export default SignInScreen
