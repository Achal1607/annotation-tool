import path from "path";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    console.log(req.body);

    console.log(req)
    const { datasetName, segmentMask, outputJson, imageName } = req.body;
console.log(datasetName,outputJson,imageName);
    const outputPath = path.join(process.cwd(), `public/output/${datasetName}`);
    const inputImagePath=path.join(process.cwd(),`public/input/${datasetName}/${imageName}.jpeg`)
    const outputImageName=`${imageName}_mask`;
    console.log(outputJson);
    await fs.writeFile(`${outputPath}/${imageName}.json`,outputJson);
    
    const imageBuffer = segmentMask;
    
    await fs.createWriteStream(`${outputPath}/${outputImageName}`).write(imageBuffer);
    
    await fs.rename(inputImagePath, outputPath, function (err) {
      if (err) {
          throw err
      } else {
          console.log("Successfully moved the file!");
      }
  });

    res.status(200).json({ message: "successfully annotated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
