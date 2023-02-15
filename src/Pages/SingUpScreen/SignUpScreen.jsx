import React, { useRef } from 'react'

// importing CSS
import "./SignUpScreen.css";

const SignUpScreen = ({startEmail, updateSignIn}) => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register= async (e)=>{
        e.preventDefault();

        // createing the user with email and password
        // auth.createUserWithEmailAndPassword(
        // emailRef.current.value,
        // passwordRef.current.value
        // ).then((authUser)=>{
        // console.log(authUser);
        // }).catch(error=>{
        // alert(error.message);
        // })  
        
    }

    // Singing in
    const handleSignIn=()=>{
        updateSignIn();

    }
  return (
    <div className='signupScreen'>
      
      <form className='formElements' action="">
          <h3>Sign Up</h3>
          <input ref={nameRef} type="text" placeholder='Name' />          
          <input ref={emailRef} type="email" placeholder='Email'  />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button type='submit' onClick={handleSignIn}>Sign Up</button> 
          <p>Already have an Account? <a href='/' >Sign In</a></p>     
      </form>
    </div>
  )
}

export default SignUpScreen
