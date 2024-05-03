import React from 'react';
import './HomePage.css'; // Importați fișierul de stiluri CSS pentru a formata pagina
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bgimg display-container text-white">
      <div className="display-middle">
        <div className="logo-container">
            <p>Nedelea Family Fields</p>
        </div>
      </div>
      <div className="top-buttons">
      <div className="top-left-buttons">
        <p><Link to="/aboutUs" className="button black"> ABOUT US </Link></p>
        <p><Link to="/localShop" className="button black">LOCAL SHOP</Link></p>
        <p><Link to="/logIn" className="button black"> RESERVATION </Link></p>
      </div>
      <div className="top-right-buttons">
        <p><button onClick={() => document.getElementById('NEW & EVENTS').style.display='block'} className="button black">NEW & EVENTS</button></p>
        <p><button onClick={() => document.getElementById('GALLERY').style.display='block'} className="button black">GALLERY</button></p>
        <p><button to="/logIn" onClick={() => document.getElementById('CONTACT').style.display='block'} className="button black">CONTACT</button></p>
      </div>
      </div>
      <div className="bottom-right">
        <p className="w3-xlarge">monday - friday 10am-6pm </p>
        <p className="w3-xlarge">BN, Loc. Sarata, nr.153 </p>
        </div>
    </div>
  );
}

export default HomePage;