import React, { useContext, useState } from "react";

export const AppContext = React.createContext({
  activeClass: undefined,
  setActiveClass: async (activeClass) => null,
  allClasses: undefined,
  setAllClasses: async (classes) => null,
  pointsData: undefined,
  setPointsData: async (points) => null,
  config: undefined,
  setConfig: async (config) => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [activeClass, setActiveClass] = useState({});
  const [allClasses, setAllClasses] = useState([]);
  const [pointsData, setPointsData] = useState({});
  const [config, setConfig] = useState({
    colorIndex: 0,
    canvasName: "AnnotateCanvas",
    pointsSize: 5,
    canvasStack: [],
  });

  return (
    <AppContext.Provider
      value={{
        allClasses,
        setAllClasses,
        activeClass,
        setActiveClass,
        pointsData,
        setPointsData,
        config,
        setConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
