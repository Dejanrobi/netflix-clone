import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


import "./SignInScreen.css";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { dualballload } from '../../Constants/images';


const SignInScreen = () => {
  
  const signInemailRef = useRef(null);
  const signInpasswordRef = useRef(null);
  
  const navigate = useNavigate();

  // obtaining the startEmail
  const { startEmail, login, removeWords } = useAuth();

  const [error, setError] = useState('');
  const [signInLoad, setSignInLoad]  = useState(false);

  // Load Button
  const loadButton = (e)=>{
    e.preventDefault();

  }

  // login user
  const loginUser= async(e)=>{
    e.preventDefault();

    try {
      setError('')
      setSignInLoad(true)

      await login(signInemailRef.current.value, signInpasswordRef.current.value);

      navigate("/")
      
    } catch (error) {

      let modErr = await removeWords(error.message)
      setError(modErr)    
      // console.log(modErr)  

      setTimeout(() => {
        setError('')
      }, 4000);
    }

    setSignInLoad(false);

  
  }





  

  return (
    <div className='signInLogin'>
      <div className='signInScreen'>
     
        <form onSubmit={loginUser} className='signInformElements' action="">
            {error && <div className='signError'>{error}</div>}
            <h3>Sign In</h3>          
            <input ref={signInemailRef} type="email" placeholder='Email' defaultValue={startEmail} required />
            <input ref={signInpasswordRef} type="password" placeholder='Password' required />
            {
              signInLoad?(
                <button type='submit' onClick={loadButton} >
                  <img className='buttonLogin' src={dualballload} alt="" />             
                </button> 

              ):(
                <button type='submit' >
                  Sign In         
                </button> 

              )
            }
              
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
