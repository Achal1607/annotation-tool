/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'

const DatasetImageCard = ({ dataset }) => {
    const router = useRouter()
    const { profileUrl, name, numOfImg } = dataset;

    const handleOnClick = () => {
        router.push(`/input/${name}`);
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={handleOnClick}>
            <img src={profileUrl} alt="Random" className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-red-600 text-xl mb-2 truncate hover:text-clip">{name}</div>
                <ul>
                    <li><strong>Number Of images: {numOfImg}</strong></li>
                </ul>
            </div>
        </div>
    )
}

export default DatasetImageCard