import React, { useRef } from 'react';
// import { auth } from '../../firebase';

import "./SignupScreen.css";

const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register=(e)=>{
    e.preventDefault();

    // auth.createUserWithEmailAndPassword(
    //   emailRef.current.value,
    //   passwordRef.current.value
    // ).then((authUser)=>{
    //   console.log(authUser);
    // }).catch(error=>{
    //   alert(error.message);
    // })
  }

  // Singing in
  const singIn = (e)=>{
    e.preventDefault();
  }
  return (
    <div className='signupScreen'>
      
      <form className='formElements' action="">
          <h3>Sign In</h3>          
          <input ref={emailRef} type="email" placeholder='Email' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button type='submit' onClick={singIn}>Sign In</button> 
          {/* <p>New to Netflix? <a href="" onClick={register}>Sign Up now</a></p>      */}
      </form>
    </div>
  )
}

export default SignupScreen
