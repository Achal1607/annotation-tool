import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  try {
    //Extract params
    const { outputJson, imgBase64, imageName, datasetName } = req.body;

    // Output dir path
    const outputPath = path.join(process.cwd(), `public/output/${datasetName}`);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    const outputImageName = `${imageName
      .split(".")
      .slice(0, -1)
      .join(".")}_mask.${imageName.split(".").pop()}`;

    const inputImagePath = path.join(
      process.cwd(),
      `public/input/${datasetName}/${imageName}`
    );

    //Write output files
    fs.writeFile(
      `${outputPath}/${outputImageName}`,
      imgBase64,
      "base64",
      (err) => {
        throw err;
      }
    );

    fs.writeFile(
      `${outputPath}/${imageName.split(".").slice(0, -1).join(".")}.json`,
      outputJson,
      "utf8",
      (err) => {
        throw err;
      }
    );

    fs.rename(inputImagePath, `${outputPath}/${imageName}`, (err) => {
      throw err;
    });

    res
      .status(200)
      .json({ message: `successfully saved to output folder ${datasetName}` });
  } catch (err) {
    res.status(500).json(err);
  }
}
