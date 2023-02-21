import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { loadingWhite } from '../../Constants/images';
import { dualballload } from '../../Constants/images';

// importing CSS
import "./SignUpScreen.css";
import { updateProfile } from 'firebase/auth';

import { firestoreDb } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';

const SignUpScreen = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // obtaining the signupFunction from the auth
    const { signup, startEmail } = useAuth();

    // setting the errors and loading while signing up
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Navigate Hook
    const navigate = useNavigate();

    const loadButton = (e)=>{
      e.preventDefault();

    }

    const registerUser= async (e)=>{
        // prevents the form from refreshing
        e.preventDefault();

        // calling our signup function and passing in the email and password
        try {
          setError('')
          setLoading(true)

          const userResponse = await signup(emailRef.current.value, passwordRef.current.value)
          
          navigate("/")

          // updating the userProfile
          await updateProfile(userResponse.user, {
            displayName: nameRef.current.value
          });

          // Setting the user's details in cloud firestore
          await setDoc(doc(firestoreDb, "users", userResponse.user.uid), {
            uid: userResponse.user.uid,
            displayName: nameRef.current.value,
            email: emailRef.current.value
            
          });

          // Navigate to the homescreen
          
          
        } catch (error) {
          setError(error.message)  
        }

        // setting loading to false after everything
        setLoading(false)

        
         
        
    }

    
    // setLoading(false);
    



    // Singing in
    


  return (
    <div className='signUpLogin'>
      <div className='signUpScreen'>
      
        <form onSubmit={registerUser} className='signUpformElements' action="">
            {error && <div className='signError'>{error}</div>}
                     
            <h3>Sign Up</h3>
            <input ref={nameRef} type="text" placeholder='Name' required />          
            <input ref={emailRef} type="email" placeholder='Email' defaultValue={startEmail}   required/>
            <input ref={passwordRef} type="password" placeholder='Password' required />

            {
              loading?(
                <button type='submit' onClick={loadButton} >
                  <img className='buttonLogin' src={dualballload} alt="" />             
                </button> 

              ):(
                <button type='submit' >
                  Sign Up          
                </button> 

              )
            }

            
              
            <div className='goToSignIn'>
              <p>Already have an Account? </p> 
              <p className='signIn' onClick={()=>{
                navigate("/login")
              }}>Sign In</p>
              {/* <button onClick={handleSignIn}>Sign In</button> */}
            </div>
                
        </form>
      </div>

    </div>
    
  )
}

export default SignUpScreen
