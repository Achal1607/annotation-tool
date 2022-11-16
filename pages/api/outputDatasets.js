import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const { dataset: datasetName } = req.query;

    const outputPath = path.join(process.cwd(), `public/output/${datasetName}`);

    const files = await fs.readdir(outputPath);

    let result = files.map((file) => ({
      profileUrl: path.join(`/output/${datasetName}/`, file),
      name: file.split(".").slice(0, -1).join("."),
      datasetName,
      extension: file.split(".").pop(),
    }));
    result = result.filter((file) => file.extension !== "json");
    result = result.filter((file) => file.name.split("_").pop() !== "mask");
    
    res.status(200).json({ images: result });
  } catch (err) {
    res.status(500).json(err);
  }
}
