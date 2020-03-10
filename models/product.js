//---Using Sql with Sequelize--

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	title: Sequelize.STRING,
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowUrl: false,	
	},
	description: {
		type: Sequelize.STRING,
		allowUrl: false
	},
})

module.exports = Product;
//-----------End of Sequelize----
/*//---Modal for SQL database
const db = require('../util/database');

const Cart = require('./cart');

// const products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
    	this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    //Save a product
    save() {
        // products.push(this);
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        	[this.title, this.price, this.imageUrl, this.description]
        	);
        
    }

    //get all Product
    static fetchAll() {
        // return products;
        return db.execute('SELECT * FROM products');
        
    }

    //Delete Product
    static deleteById(id) {
	    
	}

    //get product Id
    static findById(id) {
    	return db.execute('SELECT * FROM product WHERE product.id = ?', [id]);
    }

}

//----End of Sql database modal */

/*----Modal For using File----

const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

//Fetch File
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

//Read File
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// const products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
    	this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    //Save a product
    save() {
        // products.push(this);
        
        getProductsFromFile(products => {
        	if (this.id) {
        		const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        		const updatedProducts = [...products]
        		updatedProducts[existingProductIndex] = this;
        		fs.writeFile(p, JSON.stringify(updatedProducts), err => {
		        console.log(err);
		      });
        	} else {
        		this.id = Math.random().toString();
        		products.push(this);
			    fs.writeFile(p, JSON.stringify(products), err => {
			        //console.log(err);
			    });
        	}
	      
	    });
    }

    //get all Product
    static fetchAll(cb) {
        // return products;
        getProductsFromFile(cb);
    }

    //Delete Product
    static deleteById(id) {
	    getProductsFromFile(products => {
		    const product = products.find(prod => prod.id === id);
		    const updatedProducts = products.filter(prod => prod.id !== id);
		    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
		      	if (!err) {
		          	Cart.deleteProduct(id, product.price);
		        }
		    });
	    });
	}

    //get product Id
    static findById(id, cb) {
    	getProductsFromFile(products => {
    		const product = products.find(p => p.id === id);
    		cb(product);
    	})
    }

}

//-------End of File Modal----*/