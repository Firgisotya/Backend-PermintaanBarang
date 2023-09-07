require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306
  },
  test: {
    username: "",
    password: null,
    database: "permintaanbarang",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306
  },
}