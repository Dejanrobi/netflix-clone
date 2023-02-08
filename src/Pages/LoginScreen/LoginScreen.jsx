import React from 'react'
import { netflixlogo } from '../../Constants/images';

import './LoginScreen.css';

const LoginScreen = () => {
  return (
    <div className='loginScreen'>
      <div className="loginScreen_background">
        <img 
            className='loginScreen__logo'
            src={netflixlogo} alt="login Screen Logo" 
        />

        <button>
            Sign In
        </button>
      </div>
    </div>
  )
}

export default LoginScreen
