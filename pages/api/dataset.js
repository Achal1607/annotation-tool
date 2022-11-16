import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    const datasetsPath = path.join(process.cwd(), `public/${type}`);

    const datasets = await fs.readdir(datasetsPath);

    const files = [];
    for await (const dataset of datasets) {
      const datasetPath = path.join(process.cwd(), `public/${type}/${dataset}`);
      const images = await fs.readdir(datasetPath);

      files.push({
        name: dataset,
        numOfImg: images.length,
        images,
      });
    }
    const result = files.map((dataset) => {
      
      let images = dataset.images.filter(
        (image) => image.split(".").pop() !== "json"
      );

      images = images.filter((image) => {
        let temp = image.split(".").slice(0, -1).join(".");
        return temp.split("_").pop() !== "mask";
      });

      return {
        name: dataset.name,
        numOfImg: images.length,
        profileUrl: path.join(`/${type}/${dataset.name}`, images[0]),
      };
    });

    res.status(200).json({ datasets: result });
  } catch (err) {
    res.status(500).json(err);
  }
}
