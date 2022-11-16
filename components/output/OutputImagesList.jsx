import React from 'react';
import OutputImageCard from './OutputImageCard.jsx';

function OutputImagesList({ images }) {
    return (
        <div className="container mx-auto mt-10 px-10">
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => <OutputImageCard key={index} image={image} />)}
            </div>
        </div>
    );
}

export default OutputImagesList;