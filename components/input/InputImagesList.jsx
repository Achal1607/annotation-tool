import React from 'react';
import InputImageCard from './InputImageCard.jsx';

function InputImagesList({ images }) {
    return (
        <div className="container mx-auto mt-10 px-10">
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => <InputImageCard key={index} image={image} />)}
            </div>
        </div>
    );
}

export default InputImagesList;