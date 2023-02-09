import React, { useState } from 'react'
import { netflixlogo } from '../../Constants/images';
import {BsChevronRight} from "react-icons/bs"

import './LoginScreen.css';
import SignupScreen from '../SignupScreen/SignupScreen';

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className='loginScreen'>
      <div className="loginScreen_background">
        <div className="nav__login">
          <img 
              className='loginScreen__logo'
              src={netflixlogo} alt="login Screen Logo" 
          />

          <button onClick={()=>{setSignIn(true)}} className='loginScreen__button'>
              Sign In
          </button>

          <div className="loginScreen__gradient">
            <div className="loginScreen__body">
              {
                signIn ? (
                  <SignupScreen/>
                ):(
                  <>
                    <div className="login__content">
                      <h1>Unlimited movies, TV shows, and more.</h1>
                      <p className='watch'>Watch anywhere. Cancel anytime.</p>
                      <p className='ready'>Ready to watch? Enter your email to create or restart your membership.</p>
                      <div className="getStarted">
                        <input className='emailInput' type="email" name="email" id="email" placeholder='Email address' />
                        <button onClick={()=> setSignIn(true)} className='getStartedButton'>Get Started <BsChevronRight/></button>
                      </div>

                    </div>
                    
                  </>
                )
              }
              
              
            </div>
          </div>
        </div>
        
        


        
      </div>

      
    </div>
  )
}

export default LoginScreen
