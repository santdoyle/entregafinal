const configDb = require('../connection')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    nombre: {
        type: String,
        min: [6, 'Debe tener al menos 6 caracteres. Tenes {VALUE}'],
        required: [true, 'El Nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String, 
        required: [true, 'El email es obligatorio'],
        unique: [true, 'El correo ya está registrado']
    },
    telefono: {
        type: Number, 
        required: [true, 'El teléfono es obligatorio'],
        unique: [true, 'El teléfono ya está registrado.']
    },
    caracteristica: {
        type: Number, 
        required: [true, 'La característica es obligatorio']
    },
    password: {
        type: String, 
        required: [true, 'El campo contraseña es obligatorio']
    },
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