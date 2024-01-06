const { log, Console } = require('console');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const getJson= () =>{
	const productsFilePath = path.join(__dirname, '../data/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products;
}

const productController = {
  cart: (req, res) => {
    res.render("products/productCart");
  },
  detail: (req, res) => {
    res.render("products/productDetail");
  },
  edit: (req, res) => {
    res.render("products/productEdit");
  },

  createForm: (req, res) => {
    res.render("products/productCreate_form");
  },

  dashboard: (req, res) => {
    
    const products = getJson();
    res.render("products/dashboard", {title: "Dashboard", products});
  },
  destroy: (req,res) => {
    let {id}=req.params;
    console.log("metodo delete", id);
    const products=getJson();
    console.log(products);
    const newArray=products.filter(product => product.id != id);
    console.log("newArray", newArray);
    const json=JSON.stringify(newArray);
	        fs.writeFileSync(productsFilePath,json, 'utf-8');
	        res.redirect("/");
           
  }
}
module.exports = productController;
