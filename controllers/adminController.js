const Product = require('../models/product');

exports.getAddProduct=(req, res, next) =>{
    res.render('admin/edit-product',{
        pageTitle:"Add Product",
        path:'/admin/add-product',
        editing:false
    })

};

exports.postAddProducts = (req,res,next)=>{ 
    const title1= req.body.title;
    const image = req.body.imageUrl;
    const itemPrice = req.body.price;
    const desc = req.body.description;
    req.user.createProduct({
        title:title1,
        price:itemPrice,
        imageUrl:image,
        description:desc,
        
    })
    // console.log(title)
    // what sheets man
     .then(result=>{
            // console.log(result);
            console.log('created product');
        })
        .catch(err=>{
            console.log(err);
        })
};

exports.getEditProduct=(req, res, next) =>{
    const editMode = req.query.edit
    if(!editMode){
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle:"Edit Product",
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });
    })
    .catch(err=>console.log(err))
};

exports.postEditProduct = (req,res,next) =>{

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
    .then(product=>{
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save()
    })
    .then(result=>{
        console.log('updated Product');
        res.redirect('/admin/products');

    })
    .catch(err=>console.log(err));
  
}
exports.getProducts = (req,res,next) => {
    Product.findAll()
    .then(products=>{
        res.render('admin/products',{
            prods:products,
            pageTitle: "Admin Products",
            path:'/admin/products'
        });
    })
    .catch(err=>console.log(err))
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy()
    })
    .then(result=>{
        console.log('Destroyed product');
        res.redirect('/admin/products');

    })
    .catch(err=>console.log(err))
    
}