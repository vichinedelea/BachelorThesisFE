import React from 'react';
import './NewsAndEvents.css';
import BackToHomePageButton from './BackToHomePageButton';

const NewsAndEvents = () => {
    return (
        <div className="page-container">
            <div className="text">
                <h2>News</h2>
                <p> from April 2025 we will also have cooking as an activity </p>
                <br></br>
                <h2>Eventes</h2>
                <dl>
                    <dt> Apple picking contest </dt>
                    <dd>- on October 1</dd>
                    <dd>- whoever gathers the most apples, can also compete in a team of two or three people</dd>
                    <dd>- First Aware will be 35 l of organic apple juice</dd>

                    <dt>The autumn festival</dt>
                    <dd>- 15 - 15 September</dd>
                    <dd>- in our location</dd>
                    <dd>- you will be able to buy the last vegetable harvest </dd>
                </dl>

                < BackToHomePageButton />
            </div>
        </div>
    );
};

export default NewsAndEvents;