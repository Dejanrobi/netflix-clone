import React, { useRef, useState } from 'react'
import { netflixlogo } from '../../Constants/images';
import {BsChevronRight} from "react-icons/bs"

import './LoginScreen.css';
import SignInScreen from '../SignInScreen/SignInScreen';
import SignUpScreen from '../SingUpScreen/SignUpScreen';

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);

  const getStartedRef = useRef(null);

  const handleSubmit = (e)=>{
    e.preventDefault()

    // setting sign In to true
    setSignIn(true)

  }

  
  return (
    <div className='loginScreen'>
      <div className="loginScreen_background">
        <div className="nav__login">
          <img 
              className='loginScreen__logo'
              src={netflixlogo} alt="login Screen Logo" 
              onClick={()=>{
                setSignIn(false)
                
              }}
          />
          {
            !signIn &&(<button onClick={()=>{setSignIn(true)}} className='loginScreen__button'>
            Sign In
        </button>)
          }
          

          <div className="loginScreen__gradient">
            <div className="loginScreen__body">
              {
                signIn ? (
                 
                    <SignInScreen startEmail={getStartedRef.current.value}/>
                               
                ):(
                  <>
                    <div className="login__content">
                      <h1>Unlimited movies, TV shows, and more.</h1>
                      <p className='watch'>Watch anywhere. Cancel anytime.</p>
                      <p className='ready'>Ready to watch? Enter your email to create or restart your membership.</p>
                      <form onSubmit={handleSubmit} className="getStarted">
                        <input className='emailInput' ref={getStartedRef} type="email" required name="email" id="email" placeholder='Email address' />
                        <button type='submit' className='getStartedButton'>Get Started <BsChevronRight/></button>
                      </form>

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
