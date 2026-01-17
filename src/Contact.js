import React from 'react';
import './Contact.css';
import BackToHomePageButton from './BackToHomePageButton';

const Contact = () => {
    return (
        <div className="page-container">
            <div className="text">
                <h1>Contact </h1>
                <br></br>
                <h5>Phone number:   &ensp; 0767.061536</h5>
                <h5>Fax:            &ensp; 0767.061536</h5>
                <h5>Email:          &ensp; nedeleaFarm@gmail.com</h5>

                < BackToHomePageButton />
            </div>
        </div>
    );
};

export default Contact;