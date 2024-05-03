import React from 'react';
import HomePage from './HomePage';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Reservation from './Reservation'; 
import AboutUs from './AboutUs';
import LocalShop from './LocalShop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/logIn' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/reservation' element={<Reservation />}></Route>
        <Route path='/aboutUs' element={<AboutUs />}></Route>
        <Route path='/localShop' element={<LocalShop />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


