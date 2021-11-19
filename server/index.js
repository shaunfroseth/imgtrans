const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const app = express();

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
};

const MAX_SIZE = 200000;
const upload = multer({
  dest: "./uploads/",
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
});

app.use(express.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));

// Vision API call
async function detectText(filePath) {
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  const inputConfig = {
    content: await fs.readFile(`./static/${filePath}`),
    //content: fileName,
  };

  const features = [{ type: "TEXT_DETECTION" }];

  const fileRequest = {
    image: inputConfig,
    features: features,
  };

  const request = {
    requests: [fileRequest],
  };

  const [result] = await client.batchAnnotateImages(request);
  console.log(JSON.stringify(result, null, 2));
  return result.responses[0].textAnnotations[0].description;
}

//Translate API call
async function translateText(results, targetLang) {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate").v2;

  // Creates a client
  const translate = new Translate();

  //Target language
  const target = targetLang;

  let [translations] = await translate.translate(results, target);
  translations = Array.isArray(translations) ? translations : [translations];
  return translations.toString();
}

app.post("/upload", upload.single("file"), async (req, res) => {
  let targetLang = req.body.dialog;
  console.log("ROUTE HIT");
  try {
    await sharp(req.file.path).toFile(`./static/${req.file.originalname}`);
    fs.unlink(req.file.path, () => {
      res.json({ file: `/static/${req.file.originalname}` });
    });

    //Calling Google endpoints
    let results = await detectText(req.file.originalname);
    let translatedResults = await translateText(results, targetLang);

    //Set return object for frontend
    let returnObject = {
      results,
      translatedResults,
      file: `http://192.168.0.13:5000/static/${req.file.originalname}`,
    };

    //Send response
    res.status(200).send(returnObject);
  } catch (error) {
    res.status(422).json({ err });
  }
});

async function quickstart() {
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const fileName = "C:/Users/Shaun/Desktop/pictest.jpg";

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result;
  console.log(JSON.stringify(detections, null, 2));
  //console.log("Text:");
  //detections.forEach((text) => console.log(text));
}
app.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only jpg/png allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "File too large, max allowed size 200Kb!" });
    return;
  }
});
//quickstart();
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
