import React from 'react';
import HomePage from './HomePage';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/logIn' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


