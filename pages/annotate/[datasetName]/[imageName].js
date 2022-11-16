import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnnotateImage from "../../../components/annotation/AnnotateImage.jsx";
import ControlPanel from "../../../components/annotation/ControlPanel.jsx";
import DifferentClasses from "../../../components/annotation/DifferentClasses.jsx";
import Navbar from "../../../components/Navbar";

export default function Annotate() {
  const router = useRouter();
  const [datasetName, setDatasetName] = useState("");
  const [imageName, setImageName] = useState("");
  const [activeClass, setActiveClass] = useState({});
  const [allClasses, setAllClasses] = useState([]);
  const [pointsData, setPointsData] = useState({});
  const [config, setConfig] = useState({
    colorIndex: 0,
    canvasName: "AnnotateCanvas",
    pointsSize: 5,
    canvasStack: [],
  });

  useEffect(() => {
    if (!router.isReady) return;
    setDatasetName(router.query.datasetName);
    setImageName(router.query.imageName);
  }, [router.isReady, router.query.datasetName, router.query.imageName]);

  return (
    <div>
      <Head>
        <title>Annotate</title>
        <meta name="description" content="annotate image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <div className="container mx-auto mt-10 px-10">
          <ControlPanel
            datasetName={datasetName}
            imageName={imageName}
            pointsData={pointsData}
            setPointsData={setPointsData}
            setConfig={setConfig}
            config={config}
          />
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3 max-w-4xl" id="annotateDiv">
              <AnnotateImage
                datasetName={datasetName}
                imageName={imageName}
                activeClass={activeClass}
                pointsData={pointsData}
                setPointsData={setPointsData}
                setConfig={setConfig}
                config={config}
              />
            </div>
            <DifferentClasses
              datasetName={datasetName}
              activeClass={activeClass}
              pointsData={pointsData}
              setPointsData={setPointsData}
              setConfig={setConfig}
              config={config}
              setActiveClass={setActiveClass}
              allClasses={allClasses}
              setAllClasses={setAllClasses}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
