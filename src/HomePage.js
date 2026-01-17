import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bgimg">

      <div className="top-buttons">
        <div className="top-left-buttons">
          <Link to="/aboutUs" className="button">About Us</Link>
          <Link to="/localShop" className="button">Local Shop</Link>
        </div>

        <div className="top-right-buttons">
          <Link to="/newsAndEvents" className="button">News & Events</Link>
          <Link to="/gallery" className="button">Gallery</Link>
          <Link to="/contact" className="button">Contact</Link>
        </div>
      </div>

      <div className="logo-container">
        <p>Nedelea Family Fields</p>
        <Link to="/logIn" className="hero-btn">
          Make a Reservation
        </Link>
      </div>

      <div className="bottom-right">
        <p>monday – friday 10am – 6pm</p>
        <p>BN, Loc. Sarata, nr.153</p>
      </div>

    </div>
  );
}

export default HomePage;
