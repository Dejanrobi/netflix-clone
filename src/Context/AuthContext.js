import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';


// creating a context
const AuthContext = React.createContext();

// a function enabling  us to use the context
export function useAuth(){
    return useContext(AuthContext);
}

// taking children inside the authProvider and rendering them
const AuthProvider = ({children})=>{
    // setting the current User
    const [currentUser, setCurrentUser] = useState();

    // setting the initial Email
    const [startEmail, setStartEmail] = useState('');

    // setting the loading while retreiving the current User
    const [load, setLoad] = useState(true)

    // a function to set the start Email
    function setEmail(email){
        setStartEmail(email);
    }

    // Signing up the user using the auth module
    function signup(email, password){
        const userResponse = createUserWithEmailAndPassword(auth, email, password);
        return userResponse;
    }

   
    // Update Profile
    function emailUpdate(email){
        return updateEmail(auth.currentUser, email)
    }

    // update Password
    function passwordUpdate(password){
        return updatePassword(auth.currentUser, password)
    }

    // update the profile picture
    function pictureUpdate(downloadURL){
        return updateProfile(auth.currentUser, {
            photoURL: downloadURL
        })
    }

    // update the name
    function nameUpdate(name){
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // function to logout
    function logout(){
        return signOut(auth);
    }

    


    // Checking if we have a user
    useEffect(()=>{
        // using the onAuthStateChanged to check whether we have a user
        const unsubscribe =  onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)

            // initial Loading sets the Loading to false
            setLoad(false);
            console.log(user);
        })

        // unsubscribing from the onAuthState Changed
        return ()=>{
            unsubscribe();
        };
        
    }, [])

    // storing the values to be passed throghout the application
    const value = {
        currentUser,
        load,
        signup,
        setEmail,
        startEmail,
        emailUpdate,
        passwordUpdate,
        nameUpdate, 
        pictureUpdate,
        logout
        
    }

    // console.log(startEmail);

    // using the AuthContext inside the Provider and returning a value
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// exporting the AuthProvider
export default AuthProvider;