const configDb = require('../connection')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telefono: {type: Number, required: true, unique: true},
    caracteristica: {type: Number, required: true},
    password: {type: String, required: true},
})

//Decodificar hash, devuelve true or false
usersSchema.methods.compareHash = function(password){
    return bcrypt.compareSync(password, this.password)
}

//Crear hash de contraseña
usersSchema.methods.createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


module.exports = mongoose.model(usersCollection, usersSchema)