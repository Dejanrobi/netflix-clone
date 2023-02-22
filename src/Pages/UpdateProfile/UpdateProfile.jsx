import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { avatar, dualballload } from '../../Constants/images';
import { useAuth } from '../../Context/AuthContext';
import { storage } from '../../firebase';

import "./UpdateProfile.css";
const UpdateProfile = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const pictureRef = useRef(null);
    
    
   

    const { currentUser, emailUpdate, passwordUpdate, pictureUpdate, nameUpdate, removeWords } = useAuth();
   

    // setting the errors and loading while signing up
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [uploadLoad, setuploadLoad] = useState(false);

    const [imageAsset, setImageAsset] = useState(null);

    const [success, setSuccess] = useState(null);

    // Navigate Hook
    const navigate = useNavigate();

    const loadButton = (e)=>{
      e.preventDefault();

    }

    const uploadImage =()=>{

        setuploadLoad(true);
        const d = new Date();

        let time = d.getTime();
        const fileAddress = time + currentUser.displayName.replace(/\s/g, "");

        console.log(fileAddress)

        const storageRef = ref(storage, fileAddress);

        // uploading the file

                
        const uploadTask = uploadBytesResumable(storageRef, pictureRef.current.files[0])

        uploadTask.on(
            "state_changed",
            (snapshot)=>{

            },
            (error)=>{
                setError(error.message)
            },
            ()=>{

                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{

                    setImageAsset(downloadURL)
                    setuploadLoad(false)
                })
            }
        )

        

    }

    const updateUserProfile = async(e)=>{
        e.preventDefault();

        if (nameRef.current.value === currentUser.displayName){
            setError("Please Add a New UserName")
            return setTimeout(() => {
                setError(null)
                
            }, 4000); 
        }

        if (emailRef.current.value === currentUser.email){
            setError("Please Add a New Email")
            return setTimeout(() => {
                setError(null)
                
            }, 4000); 
        }



        setLoading(true)

        try {

            if(nameRef.current.value){
                await nameUpdate(nameRef.current.value)
            }

            if(emailRef.current.value){
                await emailUpdate(emailRef.current.value)
            }

            if(passwordRef.current.value){
                await passwordUpdate(passwordRef.current.value)
            }

            if(imageAsset){
                
                // uploading the image
                await pictureUpdate(imageAsset)
               // setting the file address
                

            }

            setSuccess("Data Updated Successfully")

            setTimeout(() => {
                setSuccess(null)                
            }, 4000);

            
        } catch (error) {
            let modErr = await removeWords(error.message)
            setError(modErr)    
            // console.log(modErr)  
            
            setTimeout(() => {
                setError('')
            }, 4000);
           
        }

        setLoading(false)

        

        
    }

    
    // setLoading(false);
    



    // Singing in
    


  return (
    <div className='signUpLogin'>
      <div className='signUpScreen'>
      
        <form onSubmit={updateUserProfile} className='signUpformElements' action="">
            {error && <div className='signError'>{error}</div>}
            {/* <div className="signError">Error</div> */}
            {success && <div className='signSuccess'>{success}</div>}
            
                     
            <h3>Update Profile</h3>
            <p>Leave blank to retain the initial profiles</p>
            <input ref={nameRef} type="text" placeholder='Name' defaultValue={currentUser.displayName}/>          
            <input ref={emailRef} type="email" placeholder='Email' defaultValue={currentUser.email} />
            <input ref={passwordRef} type="password" placeholder='Password'/>

            <input ref={pictureRef}
                style={{ display: "none" }}
                type="file"
                name=""
                onChange={uploadImage}
                id="file-input"
            />

            
            <div className='uploadBut'>
                {
                    uploadLoad?(
                        <div className='isloading'>
                            <img className='buttonLogin' src={dualballload} alt="" />    
                        </div>

                    ):(
                        <label className='upload-profile' htmlFor="file-input">
                            <img src={imageAsset?imageAsset:avatar} alt="" />  
                            <p>{`${imageAsset?"Uploaded Successfully": "Click Here to Upload"}`}</p>              
                        </label>

                    )

                }
                
               
                
                

                
            </div>
            
                           
            {
              loading?(
                <button type='submit' onClick={loadButton} >
                  <img className='buttonLogin' src={dualballload} alt="" />             
                </button> 

              ):(
                <button type='submit' >
                  Update       
                </button> 

              )
            }
         
              
            <div className='goToSignIn'>
              
              <p   className='signIn' onClick={()=>{
                navigate("/")
              }}>Go Back</p>
              {/* <button onClick={handleSignIn}>Sign In</button> */}
            </div>
                
        </form>
      </div>

    </div>
    
  )
}

export default UpdateProfile;
