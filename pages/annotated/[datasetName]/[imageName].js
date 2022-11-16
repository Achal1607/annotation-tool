/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function OutputImage({ outputJson }) {
  const router = useRouter();
  const [datasetName, setDatasetName] = useState("");
  const [imageName, setImageName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setDatasetName(router.query.datasetName);
    setImageName(router.query.imageName);
    const div = document.getElementById("annotateDiv");
    const maxWidth = div.clientWidth;

    const img = document.createElement("img");
    img.src = `/output/${datasetName}/${imageName}`;

    const origigalImg = document.getElementById("mask_img");

    const { naturalWidth, naturalHeight } = img;
    let scaleFactor = 1.0;

    if (naturalWidth > maxWidth) {
      scaleFactor = maxWidth / naturalWidth;
      origigalImg.style.width = Math.round(naturalWidth * scaleFactor) + "px";
      origigalImg.style.height = Math.round(naturalHeight * scaleFactor) + "px";
      document.getElementById("outputJsonDiv").style.height =
        Math.round(naturalHeight * scaleFactor) + "px";
    }

    setUrl(`/output/${datasetName}/${imageName}`);
  }, [
    datasetName,
    imageName,
    router.isReady,
    router.query.datasetName,
    router.query.imageName,
    url,
  ]);

  return (
    <div>
      <Head>
        <title>Output Image</title>
        <meta name="description" content="annotate image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <div className="container mx-auto mt-10 px-10">
          <div className="mb-3 grid grid-cols-3 gap-5">
            <div className="col-span-2 font-semibold">Output Mask</div>
            <div className="font-semibold">Output JSON</div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div id="annotateDiv" className="col-span-2">
              <img src={url} id="mask_img" alt="mask image" />
            </div>
            <div
              className="overflow-y-auto bg-black text-white"
              id="outputJsonDiv"
            >
              <pre className="p-3">{JSON.stringify(outputJson, null, 2)}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { datasetName, imageName } = query;
  const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

  const res = await fetch(
    `${baseUrl}/api/outputImageDetails?dataset=${datasetName}&image=${imageName}`
  );
  const { outputJson } = await res.json();

  return {
    props: { outputJson },
  };
};
