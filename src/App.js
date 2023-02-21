import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';


import './App.css';
import { useAuth } from './Context/AuthContext';

import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import Loading from './Pages/Loading/Loading';
import LoginScreen from './Pages/LoginScreen/LoginScreen';
import SignInScreen from './Pages/SignInScreen/SignInScreen';
import SignUpScreen from './Pages/SingUpScreen/SignUpScreen';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';



function App() {

  const { load, currentUser } = useAuth();
  const user = null;

  return (
    <div className="app">

      {/* <SignUpScreen/> */}

      {
        load ? (
          <Loading/>
        ):(
          <>
          {
            !currentUser?(
              <Routes>
                <Route exact path='/' element={<LoginScreen/>}/>
                <Route exact path='/login' element={<SignInScreen/>}/>
                <Route exact path='/signup' element={<SignUpScreen/>}/>

              </Routes>
            ):(
              <Routes>
                <Route exact path='/' element={<HomeScreen/>}/>
                <Route exact path='/home' element={<HomeScreen/>}/>
                <Route exact path='/update-profile' element={<UpdateProfile/>}/>
              </Routes>
            )
          }
          </>
        )
      }
      
      {/* <HomeScreen/> */}
      {/* Routes */}
      {/* <BrowserRouter>
        {
          !user ? (
            <LoginScreen/>
          ):(
            <Routes>
              <Route exact path='/' element={<HomeScreen/>}/> 
              <Route path='/test' element={<h1>Whatsapp</h1>}/>         
            </Routes>
          )
        }
        
      </BrowserRouter> */}
    </div>
  );
}

export default App;
