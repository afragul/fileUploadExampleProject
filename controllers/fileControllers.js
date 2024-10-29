const File = require("../models").Files;
const User = require("../models").User;
var UserFile = require("../models").UserFiles;

const config = require("../config/config");

const createError = require("http-errors");
const path = require('path');
const process = require('process');


const upload = async (req, res, next) => {
  try {
    const userFilesArray = []; //birden cok dosya ekleme yapilabildigi icin arraye atiyoruz

    for (const file of req.files) { // her bir yuklenen dosyayi cekip db ye ve arraye ekleme

      const addFile = await File.create(
        {
          Name: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          ServerName: file.filename
        }
      );

      userFilesArray.push({
        userId: req.User.id,
        FileId: addFile.dataValues.id
      });
    }
    await User.update({ UsedQuota: req.newUsage }, { where: { id: req.User.id } });

    await UserFile.bulkCreate(userFilesArray, { transaction: req.transaction });

    req.data = req.files;
    next();
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const files = await UserFile.findAll( //iliski kurulan tablo kullanildi
      {
        attributes: ["userId", "FileId"],
        where: {
          userId: req.User.id //ara tablodaki userid nin userdaki is ye esit olmasi lazim
        },
        include: [
          {
            attributes: ["Name", "fileType"],
            model: File, //userin file larina erisildi
            as: "Files",
          },
        ],
      }
    )
    req.data = files
    next()
  } catch (err) {
    next(err);
  }
};

const getByName = async (req, res, next) => {
  try {
    const findFile = await File.findOne({
      where: {
        Name: req.params.name
      }
    });
    if (!findFile) throw new createError.NotFound('File not found');

    const userFile = await UserFile.findOne({
      where: {
        userId: req.User.id,
        FileId: findFile.id
      }
    });

    if (!userFile && req.User.Role.Name !== 'admin') throw new createError.Forbidden('You do not have permission to access this resource.');

    const filePath = path.join(process.cwd(), config.userUploadFolder + "/" + findFile.dataValues.ServerName);
    res.sendFile(filePath, (err) => {
      if (err) {
        next(err);
      }
      return;
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { upload, getAll, getByName };