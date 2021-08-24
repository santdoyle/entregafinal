require('../connection')
const mongoose = require('mongoose')

const chatCollection = 'mensajes'

const chatSchema = new mongoose.Schema({
    mensaje: {type: String, required: true},
    de: {type: String, required: true},
    deID: {type: String, required: true},
    para: {type: String, required: true},
    paraID: {type: String, required: true},
    fecha: {type: String, required: true}
})

module.exports = mongoose.model(chatCollection, chatSchema)