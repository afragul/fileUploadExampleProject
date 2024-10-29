const express=require("express");
var router = express.Router();
var authController = require("../controllers/authControllers");
const { bodyValidationMiddleware } = require("../middlewares/validationMiddleware");
const { registerSchema, updateSchema, loginSchema } = require("../schemas/authSchema");
const { successHandler } = require("../middlewares/handlers/successHandler");

router.post("/register", bodyValidationMiddleware(registerSchema), authController.register, successHandler);

router.post("/login" , bodyValidationMiddleware(loginSchema),authController.login, successHandler)

module.exports={router};