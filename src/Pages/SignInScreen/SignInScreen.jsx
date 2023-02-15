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
  return (
    <div>
      {
        !signUp?(
          <div className='signInScreen'>
      
            <form className='signInformElements' action="">
                <h3>Sign In</h3>          
                <input ref={signInemailRef} type="email" placeholder='Email' defaultValue={startEmail} />
                <input ref={signInpasswordRef} type="password" placeholder='Password' />
                <button type='submit' onClick={singIn}>Sign In</button> 
                <p>New to Netflix? <button onClick={()=>setSignUp(true)}>Sign Up now</button></p>     
            </form>
          </div>
        ):(
          <div className='signUpScreen'>
      
            <form autoComplete='off' className='signUpformElements' action="">
                <h3>Sign Up</h3>
                <input ref={signUpnameRef} placeholder='Name' defaultValue={""}/>
                <input ref={signUpemailRef} type="email" placeholder='Email' defaultValue={startEmail}/>
                <input autoComplete='off' ref={signUppasswordRef} type="password" placeholder='Password' />
                
                <button type='submit' >Sign Up</button> 

                <p>Already have an Account? </p>     
            </form>
          </div>
        )
      }
    </div>
    
    
  )
}

export default SignInScreen
