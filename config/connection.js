const Sequelize = require('sequelize')
const config = require('./config')

const devDB = new Sequelize(config.development.database, config.development.username, config.development.password, config.development);

module.exports = {
    devDB
}