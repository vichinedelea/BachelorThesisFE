import React from 'react';
import './Gallery.css';
import BackToHomePageButton from './BackToHomePageButton';

const Gallery = () => {
    const images = [
        { id: 1, url: '/cows.png', alt: 'cows' },
        { id: 2, url: '/cats.png', alt: 'cats' },
        { id: 3, url: '/ducks.png', alt: 'ducks' },
        { id: 4, url: '/rabbits.png', alt: 'rabbits' },
        { id: 5, url: '/sheeps.png', alt: 'sheeps' }
    ];

    return (
        <div className="gallery">
            <h1>Our Photo Gallery</h1>
            <div className="image-grid">
                {images.map(image => (
                    <div key={image.id} className="image-item">
                        <img src={process.env.PUBLIC_URL + image.url} alt={image.alt} />
                    </div>
                ))}
            </div>
            
            <BackToHomePageButton/>
        </div>
    );
};

export default Gallery;
