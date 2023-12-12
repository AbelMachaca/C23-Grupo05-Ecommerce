const productController = {
    cart:(req,res)=>{
        res.render("products/productCart");
    },
    detail:(req,res) => {
        res.render("products/productDetail");
    }, 
    edit:(req,res) => {
        res.render("products/productEdit");
    }, 
    createForm:(req,res) => {
        res.render("products/productCreate_form");
    }, 
}
module.exports= productController;