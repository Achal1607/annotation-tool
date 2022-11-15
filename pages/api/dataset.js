import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const inputPath = path.join(process.cwd(), `public/input`);

    const datasets = await fs.readdir(inputPath);

    const result = [];
    for await (const dataset of datasets) {
      const datasetPath = path.join(process.cwd(), `public/input/${dataset}`);
      const images = await fs.readdir(datasetPath);
      const profileUrl = path.join(`/input/${dataset}`, images[0]);

      result.push({ name: dataset, numOfImg: images.length, profileUrl });
    }

    res.status(200).json({ datasets: result });
  } catch (err) {
    res.status(500).json(err);
  }
}
