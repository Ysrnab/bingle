const {Sequelize} = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({path: '.env'})

// const db = new Sequelize('crud_db','postgres','password',{
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 5000
// });


module.exports = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "port": parseInt(process.env.DB_PORT, 10)
};