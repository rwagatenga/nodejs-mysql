const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // res.render('admin/add-product', {
  //   pageTitle: 'Add Product',
  //   path: '/admin/add-product',
  //   formsCSS: true,
  //   productCSS: true,
  //   activeAddProduct: true
  // });
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  /*File*/
  //product.save();
  //res.redirect('/');
  /*Sql*/
  // product.save().then(() => {
  //   res.redirect('/');
  // })
  // .catch(error => console.log(error)
  //   );
  /*Sql with Sequelize*/
  req.user.createProduct({
  // Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  //   //userId: req.user.id
  }).then(results => {
    console.log('Product Created Successful');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  /*//--File--
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  //---End---*/

  //--Sql with Sequelize--
  req.user.getProducts({where: { id: prodId}})
  //Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  //--End--

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
/* // File
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products')
  //End*/

  //Sql with Sequelize
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    product.save();
  }).then(result => {
    console.log('Updated Successful');
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err);
  })

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  //File
  //Product.deleteById(prodId)

  //Sql with Sequelize
  Product.findByPk(prodId).then(product => {
    return product.destroy()
  }).then(result => {
    console.log('Product Destroyed Successful');
    return res.redirect('/admin/products')
  }).catch(error => {
    console.log(error);
  })
  
}

exports.getProducts = (req, res, next) => {
  /*//Sql
  Product.fetchAll()
    .then(([products, fieldData]) =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));*/
  //Product.findAll()
  req.user.getProducts()
    .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};
