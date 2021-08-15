const config = require('../connection')
const mongoose = require('mongoose')

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    timestamp: {type: Number, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true},
    imgUrl: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

module.exports = mongoose.model(productosCollection, productosSchema)