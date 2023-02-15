import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


import "./SignInScreen.css";
import SignUpScreen from '../SingUpScreen/SignUpScreen';


const SignInScreen = ({startEmail, updateSignUp}) => {
  const signUpemailRef = useRef(null);
  const signUppasswordRef = useRef(null);
  const signUpnameRef = useRef("Jane");
  const signInemailRef = useRef(null);
  const signInpasswordRef = useRef(null);
  

  const [signUp, setSignUp] = useState(false);

  // Singing in
  const singIn = (e)=>{
    e.preventDefault();
  }

  const handleSignup=()=>{
    setSignUp(true)
  }


  const handleSignIn=()=>{
    setSignUp(false)
  }

  const updateMySignUp=()=>{
    setSignUp(false);
  }

  return (
    <div>
      {
        signUp?(
            <SignUpScreen startEmail={signInemailRef.current.value} updateMySignUp={updateMySignUp}/>


          
        ):(
          <div className='signInScreen'>
      
            <form className='signInformElements' action="">
                <h3>Sign In</h3>          
                <input ref={signInemailRef} type="email" placeholder='Email' defaultValue={startEmail} />
                <input ref={signInpasswordRef} type="password" placeholder='Password' />
                <button type='submit' onClick={singIn}>Sign In</button> 
                   
                <div className='goToSignIn'>
                  <p>New to Netflix? </p> 
                  <p className='signIn' onClick={handleSignup}>Sign Up Now</p>
                  {/* <button onClick={handleSignIn}>Sign In</button> */}
                </div>
            </form>
          </div>
          
        )
      }
    </div>
    
    
  )
}

export default SignInScreen
