const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //create creates a new element based on that model and immediately saves it to the database.There is also build which also creates a new objectbased on the model but only in javascript  and then we have to save it manually.
  req.user.createProduct({
    //for Doubts in this section  watch video 16. Using Magic Association Methods
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  })
  .then((result)=>{
    console.log("created Product");
    res.redirect('/admin/products')
  }).catch((err)=>{
    console.log(err); 
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/')
  }
  const prodId=req.params.productId;
  req.user.getProducts({where:{id:prodId}})
    .then((products)=>{//this return the products in the form of an array
      const product=products[0];    
      if(!product){
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing:editMode,
        product:product  
      });
      
    })
    .catch((err)=>[
      console.log(err)
    ])
  

};

exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updatedDesc=req.body.description;
  Product.findByPk(prodId)
  .then((product)=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.imageUrl=updatedImageUrl;
    product.description=updatedDesc;
    return product.save()//save is a method provided by sequelize and it saves the data to the database
  }).then((result)=>{//this then will print result of return product.save()
    console.log('Updated Product');
    res.redirect('/admin/products');
  }).catch((err)=>{//this catch will catch rhe err of both then
    console.log(err);
  })


}

exports.getProducts = (req, res, next) => {
req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err)=>{
    console.log(err)
  })

};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId
  Product.findByPk(prodId)
  .then((product)=>{
    return product.destroy()
  }).then((result)=>{
    console.log("Destroyed Product")
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err)
  })
  
};