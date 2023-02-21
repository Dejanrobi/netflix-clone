import React, { useRef, useState } from 'react'
import { netflixlogo } from '../../Constants/images';
import {BsChevronRight} from "react-icons/bs"

import './LoginScreen.css';
import SignInScreen from '../SignInScreen/SignInScreen';
import SignUpScreen from '../SingUpScreen/SignUpScreen';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const LoginScreen = () => {
  // const [signIn, setSignIn] = useState(false);

  // setting the start email
  const { setEmail } = useAuth();

  const getStartedRef = useRef(null);

  const handleSubmit = (e)=>{
    e.preventDefault()

    // setting the mail
    setEmail(getStartedRef.current.value)

    // setting sign In to true
    navigate("/login")
    

  }

  const navigate = useNavigate();

  
  return (
    <div className='loginScreen'>
      <div className="loginScreen_background">
        <div className="nav__login">
          <img 
              className='loginScreen__logo'
              src={netflixlogo} alt="login Screen Logo" 
              onClick={()=>{
                navigate("/")
                
              }}
          />
          <button onClick={()=>{navigate("/login")}} className='loginScreen__button'>
              Sign In
          </button>

          
          

          <div className="loginScreen__gradient">
            <div className="loginScreen__body">

                    <div className="login__content">
                      <h1>Unlimited movies, TV shows, and more.</h1>
                      <p className='watch'>Watch anywhere. Cancel anytime.</p>
                      <p className='ready'>Ready to watch? Enter your email to create or restart your membership.</p>
                      <form onSubmit={handleSubmit} className="getStarted">
                        <input className='emailInput' ref={getStartedRef} type="email" required name="email" id="email" placeholder='Email address' />
                        <button type='submit' className='getStartedButton'>Get Started <BsChevronRight/></button>
                      </form>

                    </div>
              
              
              
            </div>
          </div>
        </div>
        
        


        
      </div>

      
    </div>
  )
}

export default LoginScreen
