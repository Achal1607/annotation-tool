/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../lib/AppContext";

function AnnotateImage({ datasetName, imageName }) {
  const [url, setUrl] = useState("");
  const { activeClass, pointsData, setPointsData, setConfig, config } = useAppContext();

  useEffect(() => {
    setUrl(`/input/${datasetName}/${imageName}`);

    const div = document.getElementById("annotateDiv");
    const maxWidth = div.clientWidth;
    const can = document.getElementById(config.canvasName);
    const ctx = can.getContext("2d");
    const img = document.createElement("img");
    img.src = url;
    const { naturalWidth, naturalHeight } = img;
    let scaleFactor = 1.0;
    if (naturalWidth > maxWidth) {
      scaleFactor = maxWidth / naturalWidth;
      ctx.canvas.width = Math.round(naturalWidth * scaleFactor);
      ctx.canvas.height = Math.round(naturalHeight * scaleFactor);
      can.style.backgroundSize = "100% 100%";
    }

    setConfig({ ...config, scaleFactor, pointSize: 5 });
  }, [datasetName, imageName, url]);

  const handleClick = (event) => {
    const { pointSize } = config;
    const rect = document.getElementById(config.canvasName).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = document.getElementById(config.canvasName).getContext("2d");

    ctx.fillStyle = activeClass?.color || 'rgba(0,0,0,0)';

    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();

    if (Object.keys(activeClass).length) {
      let updatedPointsData = { ...pointsData };
      if (activeClass.name in updatedPointsData)
        updatedPointsData[`${activeClass.name}`].points.push({ x, y });
      else {
        updatedPointsData[`${activeClass.name}`] = {};
        updatedPointsData[`${activeClass.name}`].points = [{ x, y }];
        updatedPointsData[`${activeClass.name}`].color = activeClass.color;
      }

      setPointsData(updatedPointsData);
      let updatedCanvasStack = config.canvasStack;
      updatedCanvasStack.push(activeClass.name);
      setConfig({ ...config, updatedCanvasStack });
    }
  };

  return (
      <canvas
        id={config.canvasName}
        className="cursor-pointer"
        style={{ background: `url('${url}')` }}
        onClick={handleClick}
      />
  );
}

export default AnnotateImage;
