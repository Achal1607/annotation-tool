/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'

const OutputImageCard = ({ image }) => {
    // const tags = image.tags.split(',');
    const router = useRouter();
    const { name, profileUrl, datasetName } = image;
    const handleOnClick = () => {
        router.push(`/annotated/${datasetName}/${name}_mask.jpeg`);
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={handleOnClick}>
            <img src={profileUrl} alt="Random" className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-red-600 text-xl mb-2 truncate hover:text-clip">{name}</div>
            </div>
            {/* <div className="px-6 py-4">
                {tags.map((tag, index) => <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</span>
                )}
            </div> */}
        </div>
    )
}

export default OutputImageCard