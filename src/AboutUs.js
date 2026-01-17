import React from 'react';
import './AboutUs.css';
import BackToHomePageButton from './BackToHomePageButton';

const AboutUs = () => {
    return (
        <div className="page-container">
            <div className="text">
                <h1>Welcome to our little farm</h1>
                <p>
                    We are the Nedelea family, we have had this farm since 2021,
                    currently we have different activities such as horse riding,
                    feeding the animals and picking vegetables and fruits.
                </p>
                <p>
                    If you need an outdoor activity, with family or friends,
                    we are waiting for you ;)
                </p>

                <BackToHomePageButton />
            </div>
        </div>
    );
};

export default AboutUs;
