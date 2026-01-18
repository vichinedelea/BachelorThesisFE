import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Reservation from './Reservation';
import AboutUs from './AboutUs';
import LocalShop from './LocalShop';
import Contact from './Contact';
import NewsAndEvents from './NewsAndEvents';
import Gallery from './Gallery';
import MyReservations from './MyReservations'; // 🆕 ADĂUGAT

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/logIn' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route path='/myReservations' element={<MyReservations />} />
        <Route path='/reservation' element={<Reservation />} />

        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/localShop' element={<LocalShop />} />
        <Route path='/newsAndEvents' element={<NewsAndEvents />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
