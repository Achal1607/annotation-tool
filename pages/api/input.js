import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const { dataset: datasetName } = req.query;

    const inputPath = path.join(process.cwd(), `public/input/${datasetName}`);

    const images = await fs.readdir(inputPath);
    const result = images.map((image) => ({
      profileUrl: path.join(`/input/${datasetName}/`, image),
      name: image.split(".").slice(0, -1).join("."),
      datasetName,
      extension: image.split(".").pop(),
    }));

    res.status(200).json({ images: result });
  } catch (err) {
    res.status(500).json(err);
  }
}
