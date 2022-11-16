import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  try {
    const { dataset: datasetName, image: imageName } = req.query;
    console.log(imageName, datasetName);
    const outputPath = path.join(process.cwd(), `public/output/${datasetName}`);
    const outputJsonName = imageName
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace("_mask", "");

    const outputJson = await fs.readFileSync(
      `${outputPath}/${outputJsonName}.json`
    );

    res.status(200).json({ outputJson: JSON.parse(outputJson) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
