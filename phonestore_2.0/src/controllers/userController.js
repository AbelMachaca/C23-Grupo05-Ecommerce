const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


const getJson = (fileName) => {
    const file = fs.readFileSync(`${__dirname}/../data/${fileName}.json`, 'utf-8');
    const json = JSON.parse(file);
    return json;
  };
  
  const setJson = (array, fileName) => {
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../data/${fileName}.json`, json, 'utf-8');
  };
  
  const userController = {
    login: (req, res) => {
      res.render('users/login');
    },
    formRegister: (req, res) => {
      res.render('users/register', { title: 'Registro' });
    },
    register: (req, res) => {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res.render('users/register', {
          errores: errores.mapped(),
          old: req.body,
          title: 'Registro'
        });
      }
  
      const file = req.file;
      const users = getJson('users');
      const idnew = Date.now();
  
      const { name, lastName, email, password } = req.body;
  
      const newUser = {
        id: +idnew,
        firstName: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: bcrypt.hashSync(password, 10),
        type: 'USER',
        image: file ? file.filename : 'predeterminado.webp'
      };
  
      const newJson = [...users, newUser];
      setJson(newJson, 'users');
  
      res.redirect('/users/login');
    },


  login: function (req, res) {
    res.render("users/login", { title: "login" });
  },
  processlogin: (req, res) => {
    const errors = validationResult(req);
    console.log("ingrese a error");
    if(!errors.isEmpty()){
      res.render("users/login", { errors: errors.mapped(), old: req.body });
    }else{
      const { email } = req.body;
      const dir = path.join(__dirname, "../data/users.json");
      let products = JSON.parse(fs.readFileSync(dir, "utf-8"));
      const user = products.find((usuario) => usuario.email == email);
      req.session.user = user;
      res.cookie("email", user.email, { maxAge: 1000 * 60 });
      //console.log("session:", req.session);
      res.redirect("/");
    }
    //console.log(errors);
  },

  register: (req, res) => {
    res.render("users/register");
  },
};

module.exports = userController;
