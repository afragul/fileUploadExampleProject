const express=require("express");
var router = express.Router();
var fileController = require("../controllers/fileControllers");
const { successHandler } = require("../middlewares/handlers/successHandler");
const multer = require("multer");
const config = require("../config/config");
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const { authenticationMiddleware } = require("../middlewares/authenticationMiddleware");
const { authorizationMiddleware } = require("../middlewares/authorizationMiddleware");
const { fileMiddleware } = require("../middlewares/fileMiddleware");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      dir = config.userUploadFolder;
      if (!fs.existsSync(dir)) {
        // CREATE DIRECTORY IF NOT FOUND
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "." + file.originalname.split(".").pop());
    },
  });
  
const upload = multer({
  storage: storage,
});

const downloadFile = upload.array("File");

router.post("/upload",
    authenticationMiddleware,
    function  (req, res, next) {
        downloadFile(req, res, function (err) {
            next();
        })
    },
    fileMiddleware,
    fileController.upload,
    successHandler
);

router.get("/",authenticationMiddleware,fileController.getAll,successHandler  ) //get all

router.get("/:name",authenticationMiddleware,authorizationMiddleware(["admin","free user","paid user"]),fileController.getByName,successHandler);

module.exports={router};
