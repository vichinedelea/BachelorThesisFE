import React from 'react';
import { Link } from 'react-router-dom';
import './Buttons.css';

const BackToHomePageButton = () => {
    return (
        <Link to="/" className="buttonBackToHomePage"> Back to Home Page</Link>
    )
};

export default BackToHomePageButton;