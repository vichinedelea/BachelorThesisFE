import React from 'react';
import HomePage from './HomePage';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Reservation from './Reservation'; 
import AboutUs from './AboutUs';
import LocalShop from './LocalShop';
import Contact from './Contact';
import NewsAndEvents from './NewsAndEvents';
import Gallery from './Gallery';

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

        <Route path='/newsAndEvents' element={<NewsAndEvents />}></Route>
        <Route path='/gallery' element={<Gallery />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


