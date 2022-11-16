import React, { useState } from "react";
import { COLORS_ARRAY } from "../../constants";
import ClassBox from "./ClassBox";

function DifferentClasses({ datasetName, activeClass, setActiveClass, allClasses, setAllClasses, config, setConfig, pointsData, setPointsData }) {
  const [newClassName, setNewClassName] = useState('');

  const handleAddClass = () => {
    if (!newClassName.trim().length) return;
    const validateClass = allClasses.filter(classes => classes.name === newClassName);

    if (validateClass.length) {
      alert(`class name: '${newClassName}' already exists!!`);
      return;
    }

    const newClass = {
      name: newClassName,
      color: COLORS_ARRAY[config.colorIndex]
    };
    setAllClasses([...allClasses, newClass]);
    setNewClassName('');
    setConfig({ ...config, colorIndex: config.colorIndex + 1 });


    if (!Object.keys(activeClass).length) setActiveClass(newClass);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Annotation Classes</div>
        {allClasses.length === 0 ? <ClassBox isNone={true} /> :
          allClasses.map(annotationClass =>
            <ClassBox key={annotationClass.name} isNone={false}
              annotationClass={annotationClass}
              activeClass={activeClass}
              pointsData={pointsData}
              setPointsData={setPointsData}
              config={config}
              setActiveClass={setActiveClass}
              allClasses={allClasses}
              setAllClasses={setAllClasses} />)}

        <p className="text-gray-700 text-base bg-sky-500 rounded px-3 py-1 font-semibold">
          <input type='text'
            placeholder="Add new class"
            onChange={e => setNewClassName(e.target.value)}
            onKeyUp={event => { if (event.key === "Enter") handleAddClass(); }}
            value={newClassName}
            className="w-4/5 rounded px-2" />

          <span className="float-right cursor-pointer" onClick={handleAddClass}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
            </svg>
          </span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{datasetName}
        </span>
      </div>
    </div >
  );
}

export default DifferentClasses;
