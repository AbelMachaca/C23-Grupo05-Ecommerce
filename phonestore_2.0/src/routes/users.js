const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const uploadFile = require("../validations/ImageUploader");
const registerValidation = require("../validations/validationRegister");
const cookiesGenerate= require("../middleware/cookiesGenerate")
const rememberMeValidator =require("../middleware/rememberMeValidator")


const {body, check} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require("fs")

const getJson = (fileName) => {
    const file = fs.readFileSync(`${__dirname}/../data/${fileName}.json`, 'utf-8');
    const json = JSON.parse(file);
    return json;
  };
  
  const setJson = (array, fileName) => {
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../data/${fileName}.json`, json, 'utf-8');
  };
  const users = getJson("users");



const validateLogin = [
    body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom((value, {req} )=> {
       
        const user = users.find(elemento => elemento.email == req.body.email)
        
        return bcrypt.compareSync(value, user.password);
    }).withMessage("La contraseña no es correcta"),
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isEmail().withMessage("El valor ingresado debe tener el formato de un correo electronico").bail()
    .custom(value => {
        console.log("value:",value);        
        const user = users.find(elemento => elemento.email == value);
        return user ? true : false
    }).withMessage("El usuario no existe"),
]


/* GET users listing. */
router.get("/login", userController.login);
router.post("/login", validateLogin,cookiesGenerate,userController.processlogin);
router.get('/logout', userController.logout)
router.get("/register", userController.formRegister);
router.post(
    "/register",
    uploadFile.single("image"),
    registerValidation,
    userController.register
);

module.exports = router;
