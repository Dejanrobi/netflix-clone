import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth, firestoreDb } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


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

    function setOverallLoading(load){
        setLoad(load);
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

    //Login user with email and password
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    // a function to remove certain words from an error
    function removeWords(error){
        if(error.includes("Firebase")){
            if(error.includes("Firebase: Error (auth/")){
                let newError = error.replace('Firebase: Error (auth/', 'Error: (')
                return newError
            }else if(error.includes("Firebase: Password should be at least 6 characters (auth/")){
                let newError = error.replace('Firebase: Password should be at least 6 characters (auth/', 'Error: Password should be at least 6 characters(')
                return  newError
            }
            

        }else{
            return error
        }
    }

    // function to logout
    function logout(){
        return signOut(auth);
    }

    // function addUserToFirestore
    function addUserToFirestore(userId, uid, displayName, email){
        return setDoc(doc(firestoreDb, "users", userId)),{
            uid,
            displayName,
            email
        }
    }

    


    // Checking if we have a user
    useEffect(()=>{
        // using the onAuthStateChanged to check whether we have a user
        const unsubscribe =  onAuthStateChanged(auth, (user)=>{
            setLoad(true);
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
        logout,
        login, 
        removeWords,
        setOverallLoading,
        addUserToFirestore
        
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