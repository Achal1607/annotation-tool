import React, { useState } from "react";
import { useAppContext } from "../../lib/AppContext";
import { plotPoints } from "../../utils";

function ClassBox({ annotationClass, isNone }) {
    const [deleteClass, setDeleteClass] = useState('');
    const { activeClass, allClasses, setAllClasses, setActiveClass, pointsData, setPointsData, config } = useAppContext();

    const handleSure = () => {
        const updatedClasses = allClasses.filter(allClass => allClass.name !== annotationClass.name);
        setAllClasses([...updatedClasses]);

        if (activeClass?.name === annotationClass.name) {
            setActiveClass({});
        }

        let updatedPointsData = { ...pointsData };
        delete updatedPointsData[`${annotationClass.name}`];

        setPointsData(updatedPointsData);
        plotPoints(updatedPointsData, config.pointsSize, config.canvasName);
    }

    const handleActive = () => {
        if (activeClass === annotationClass) return;
        setActiveClass(annotationClass);
    }

    if (isNone) {
        return (
            <p className="text-white text-base bg-red-500 rounded px-3 py-1 font-semibold mb-2">
                <span className="w-4/5">No class is present</span>
            </p>
        );
    }
    return (
        <>
            <p className="text-gray-700 rounded px-3 py-1 font-semibold cursor-pointer mb-2"
                id={annotationClass.name} onClick={handleActive} style={{ backgroundColor: annotationClass.color }}>
                {deleteClass ? <>
                    <span className="w-4/5">Are You Sure?</span>
                    <span className="float-right" onClick={() => setDeleteClass(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span className="float-right" onClick={handleSure}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </span>
                </>
                    :
                    <>
                        <span className="w-4/5">{annotationClass.name}</span>
                        {activeClass !== annotationClass ?
                            <span className="float-right" onClick={() => setDeleteClass(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                </svg>
                            </span>
                            :
                            <span className="float-right">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </span>
                        }
                    </>
                }
            </p>
        </>
    );
}

export default ClassBox;
