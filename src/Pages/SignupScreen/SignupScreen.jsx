import React from 'react';
import "./SignupScreen.css";

const SignupScreen = () => {
  return (
    <div className='signupScreen'>
      <h1>Sign In</h1>
      <form action="">          
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button type='submit'>Sign In</button>      
      </form>
    </div>
  )
}

export default SignupScreen
