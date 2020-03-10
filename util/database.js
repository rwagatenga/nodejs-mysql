//--Sql Connection using Sequelize--

const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodedb', 'root', '', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = sequelize;

//---End

/*---SQL Connection
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodedb',
    password: ''
});

module.exports = pool.promise();
----End-----*/