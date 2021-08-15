const configDb = require('../connection')
const mongoose = require('mongoose')

const carritoCollection = 'carrito'

const carritoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    fecha: {type: String, required: true},
    user: {type: String, required: true},
    producto: {type: String, required: true}
})

module.exports = mongoose.model(carritoCollection, carritoSchema)