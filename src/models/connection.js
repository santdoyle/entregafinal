const mongoose = require('mongoose')
const {config} = require('../../config')
const Loggers = require('../utils/logsConfig')

const url = config.URLSAS
let rpta =  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    Loggers.logInfo.info('DB sin error ' + err)
})

Loggers.logInfo.info('DB conectada correctamente.')