// config.js
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080
}

module.exports = {config}