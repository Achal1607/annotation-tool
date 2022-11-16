import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../lib/AppContext';
import { createOutputJson, downloadCanvas, plotOutputMask, plotPoints, undo } from '../../utils';

function ControlPanel({ imageName, datasetName }) {
    const { config, setConfig, setPointsData, pointsData } = useAppContext();
    const [markerSize, setMarkerSize] = useState(5);

    useEffect(() => { setMarkerSize(config.pointSize) }, [config.pointSize, markerSize, setMarkerSize]);

    const handleUndo = () => {
        const { canvasStack, pointSize, canvasName } = config;
        if (canvasStack.length == 0) return;

        const res = undo(canvasStack, pointSize, canvasName, pointsData);

        setPointsData(res.pointsData);
        setConfig({ ...config, canvasStack: res.canvasStack });
    }

    const handlePointSize = (e) => {
        const { canvasName } = config;
        setMarkerSize(e.target.value);
        plotPoints(pointsData, e.target.value, canvasName);
        setConfig({ ...config, pointSize: e.target.value });
    }

    const handleSubmit = async () => {
        const { scaleFactor, canvasName, pointSize } = config;
        const inputCtx = document.getElementById(canvasName).getContext('2d');
        const canvas = document.createElement('canvas');
        canvas.id = 'outputMask';
        const ctx = canvas.getContext('2d');

        ctx.canvas.height = Math.round(inputCtx.canvas.height / scaleFactor);
        ctx.canvas.width = Math.round(inputCtx.canvas.width / scaleFactor);
        canvas.style.backgroundColor = "#000";

        plotOutputMask(pointsData, pointSize, ctx, scaleFactor);
        const outputJson = createOutputJson(pointsData, scaleFactor);
        const dataURL = canvas.toDataURL("image/jpeg", 1.0);

        const imgBase64 = dataURL.replace('data:', '').replace(/^.+,/, '');
        const res = await axios.post(`/api/output?datasetName=${datasetName}&imageName=${imageName}`, { imgBase64, outputJson, imageName, datasetName })
        console.log(res);
    }

    return (
        <div className='mb-2 flex flex-row gap-4'>
            <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={handleUndo}
            >
                Undo
            </button>
            <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
            <div className='flex flex-row'>
                <span className='block m-0 px-3 py-1.5 font-semibold'>Markers size:</span>
                <input
                    type="number"
                    className="
                    form-control
                    block
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                    min={1}
                    max={20}
                    value={markerSize}
                    onChange={handlePointSize}
                />
            </div>
        </div>
    )
}

export default ControlPanel