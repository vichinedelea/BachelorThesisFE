import React from 'react';
import './Pages.css';
import BackToHomePageButton from './BackToHomePageButton';

const LocalShop = () => {
    return (

        <div className="text">
        <h1>Local Shop</h1>
        <p> You can find this shop in our local</p>
        <dl>
            <dt>BIO Apple/Cherry/Cranberries jam </dt>
            <dd>- 200 g               25 ron</dd>
            <dd>- 350 g               40 ron</dd>

            <dt>BIO Milk</dt>
            <dd>- 1 l                 10 ron</dd>
            <dd>- 2 l                 17 ron</dd>

            <dt>Organic Apple juice</dt>
            <dd>- 1 l                 15 ron</dd>
            <dd>- 2 l                 25 ron</dd>

            <dt>Basket with seasonal vegetables</dt>
            <dd>- 10 kg                 150 ron</dd>
            <dd>- 20 kg                 270 ron</dd>
        </dl>
        < BackToHomePageButton/>
    </div>
    );
};

export default LocalShop;