const configDb = require('../connection')
const mongoose = require('mongoose')

const ordenesCollection = 'ordenes' 

const ordenesSchema = new mongoose.Schema({
    items: {type: String, required: true},
    numeroOrden: {type: Number, required: true},
    fecha: {type: String, required: true},
    estado: {type: String, required: true},
    email: {type: String, required: true},
    cantidad: {type: Number, required: true}
})

module.exports = mongoose.model(ordenesCollection, ordenesSchema)