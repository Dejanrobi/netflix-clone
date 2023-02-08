import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';


import './App.css';

import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import LoginScreen from './Pages/LoginScreen/LoginScreen';

function App() {
  const user = null;

  return (
    <div className="app">
      {/* <HomeScreen/> */}
      {/* Routes */}
      <BrowserRouter>
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
        
      </BrowserRouter>
    </div>
  );
}

export default App;
