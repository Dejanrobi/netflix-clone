import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';


import './App.css';
import { useAuth } from './Context/AuthContext';

import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import Loading from './Pages/Loading/Loading';
import LoginScreen from './Pages/LoginScreen/LoginScreen';
import ProfileScreen from './Pages/ProfileScreen/ProfileScreen';
import SignInScreen from './Pages/SignInScreen/SignInScreen';
import SignUpScreen from './Pages/SingUpScreen/SignUpScreen';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';



function App() {

  const { load, currentUser } = useAuth();
  const user = null;

  // navigate hook
  const navigate = useNavigate();

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
                <Route path='/profile' element={<Navigate replace to="/login"/>}/>
                <Route path='/home' element={<Navigate replace to="/"/>}/>
              </Routes>
            ):(
              <Routes>
                <Route exact path='/' element={<HomeScreen/>}/>
                <Route path='/login' element={<Navigate replace to="/"/>}/>
                <Route path='/signup' element={<Navigate replace to="/"/>}/>
                <Route exact path='/home' element={<HomeScreen/>}/>
                <Route exact path='/update-profile' element={<UpdateProfile/>}/>
                <Route exact path='/profile' element={<ProfileScreen/>}/>
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
