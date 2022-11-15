export const plotPoints = (pointsData, pointSize, canvasName) => {
  const canvas = document.getElementById(canvasName);
  const ctx = document.getElementById(canvasName).getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const [key, data] of Object.entries(pointsData)) {
    for (let i = 0; i < data.points.length; i++) {
      const { x, y } = data.points[i];
      ctx.fillStyle = data.color;
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
};

export const undo = (canvasStack, pointSize, canvasName, pointsData) => {
  let lastPlotClass = canvasStack.pop();

  while (!(lastPlotClass in pointsData)) {
    lastPlotClass = canvasStack.pop();
  }

  let updatedPointsData = { ...pointsData };
  updatedPointsData[`${lastPlotClass}`].points.pop();

  plotPoints(updatedPointsData, pointSize, canvasName);

  return { canvasStack, pointsData: updatedPointsData };
};

export const downloadCanvas = (imageName, canvas) => {
  let canvasUrl = canvas.toDataURL("image/jpeg", 1.0);
  const createEl = document.createElement("a");
  createEl.href = canvasUrl;
  createEl.download = `${imageName}_segment`;
  createEl.click();
  createEl.remove();
};

export const plotOutputMask = (pointsData, pointsSize, ctx, scaleFactor) => {
  for (const [key, data] of Object.entries(pointsData)) {
    for (let i = 0; i < data.points.length; i++) {
      const { x, y } = data.points[i];
      ctx.fillStyle = data.color;
      ctx.beginPath();
      ctx.arc(
        Math.round(x / scaleFactor),
        Math.round(y / scaleFactor),
        pointsSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
    }
  }
};

export const createOutputJson = (pointsData, scaleFactor) => {
  const outputJson = {};
  for (const [key, data] of Object.entries(pointsData)) {
    outputJson[key] = { color: data.color };
    outputJson[key].points = [];
    for (let i = 0; i < data.points.length; i++) {
      const { x, y } = data.points[i];
      const realX = Math.round(x / scaleFactor);
      const realY = Math.round(y / scaleFactor);
      outputJson[key].points.push({ x: realX, y: realY });
    }
  }
  return JSON.stringify(outputJson);
};
