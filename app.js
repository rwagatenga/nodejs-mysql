const http = require('http');

const path = require('path')

const express = require('express');
var bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

//---- HandleBar---
// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );

//app.set('view engine', 'hbs');
//----End---
//app.set('view engine', 'pug');//---Pug Engine
app.set('view engine', 'ejs');//--EJS Engine
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use((req, res, next) => {
	 User.findByPk(1)
	 .then(user => {
	 	req.user = user
	 	next()
	 }).catch(error => {
	 	console.log(error);
	 })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
//const routes = require('./learn');

// const server = http.createServer(routes.handle);

// const server = http.createServer(app);

//server.listen(3000)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize/*.sync({force: true})*/
.sync().then(result => {
	return User.findByPk(1)
}).then(user => {
	if (!user) {
		return User.create({
			names: 'Fred',
			email: 'fred@gmail.com',
			password: 'fred1234'
		})
	}
	return user
}).then(user => {
	//console.log(user);
	return user.createCart()
}).then(cart => {
	app.listen(3000)
}).catch(error => {
	console.log(error);
})
.catch(err => {
	console.log(err);
})

//app.listen(3000)