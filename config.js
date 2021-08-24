// config.js
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    ADMIN: process.env.ADMIN,
    EMAILADMIN: process.env.EMAILADMIN,
    URLSAS: process.env.URLSAS,
    SESIONTIME: process.env.SESIONTIME,
    TWILOTOKEN: process.env.TWILOTOKEN,
    TWILOID: process.env.TWILOID
}

module.exports = {config}