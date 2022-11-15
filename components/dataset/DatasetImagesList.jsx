import React from 'react';
import DatasetImageCard from './DatasetImageCard.jsx';

function DatasetImagesList({datasets}) {
    return (
        <div className="container mx-auto mt-10 px-10">
            <div className="grid grid-cols-4 gap-4">
                {datasets.map((dataset, index) => <DatasetImageCard key={index} dataset={dataset} />)}
            </div>
        </div>
    );
}

export default DatasetImagesList;