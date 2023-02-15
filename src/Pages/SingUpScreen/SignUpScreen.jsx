import React, { useRef } from 'react'

// importing CSS
import "./SignUpScreen.css";

const SignUpScreen = ({startEmail, updateMySignUp}) => {
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
        updateMySignUp();

    }
  return (
    <div className='signUpScreen'>
      
      <form className='signUpformElements' action="">
          <h3>Sign Up</h3>
          <input ref={nameRef} type="text" placeholder='Name' />          
          <input ref={emailRef} type="email" placeholder='Email'  defaultValue={startEmail}/>
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button type='submit' onClick={handleSignIn}>Sign Up</button> 
          <div className='goToSignIn'>
            <p>Already have an Account? </p> 
            <p className='signIn' onClick={handleSignIn}>Sign In</p>
            {/* <button onClick={handleSignIn}>Sign In</button> */}
          </div>
              
      </form>
    </div>
  )
}

export default SignUpScreen
