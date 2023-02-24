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

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    // console.log(email)
    // console.log(name)
    
    const passwordRef = useRef(null);

    // obtaining the signupFunction from the auth
    const { signup, startEmail, removeWords, setOverallLoading } = useAuth();

    // setting the errors and loading while signing up
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Navigate Hook
    const navigate = useNavigate();

    const loadButton = (e)=>{
      e.preventDefault();

    }

    const registerUser= async(e)=>{
        // prevents the form from refreshing
        e.preventDefault();

        // calling our signup function and passing in the email and password
        try {
          setError('')
          setLoading(true)

          const userResponse = await signup(email, passwordRef.current.value)
          
          
          // console.log(userResponse.user.uid)
          // updating the userProfile

          // Update User's details function

          setOverallLoading(true);
          try {
            await updateProfile(userResponse.user, {
              displayName: name
            });

            // console.log("Data Updated Successfully!")
            
          } catch (error) {
            console.log(error.message)
          }

          try {

            const useRef = doc(firestoreDb, 'users', userResponse.user.uid);
            await setDoc(useRef, {
              uid: userResponse.user.uid,
              displayName: name,
              email: email
            })
            
            // console.log("Data Added Successfully!")
          } catch (error) {
            console.log(error)
          }

          setOverallLoading(false);

                   
        } catch (error) {
          let modErr = await removeWords(error.message)
          setError(modErr)    
          // console.log(modErr)  
          
          setTimeout(() => {
            setError('')
          }, 5000);
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
            <input value={name} onChange={((e)=>{setName(e.target.value)})} type="text" placeholder='Name' required />          
            <input value={email} onChange={((e)=>{setEmail(e.target.value)})} type="email" placeholder='Email' defaultValue={startEmail}   required/>
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
