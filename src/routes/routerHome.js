const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js')
//const listado = require('./routerProductos.js').listadoProductos
const routerHome = express.Router()
const Loggers = require('../utils/logsConfig')
const passport = require('passport')
const authorized = require('../auth/isAuthorized')

routerHome.get('/', authorized, async (request, response) => {
    try{
                
        const productos = new Productos()
        const getAll = await productos.listarTodos()
        
        //request.headers.authorization =`Bearer ${token}`
        response.render('index', {
            data: getAll,
            token: token
        })
        
    } catch (error) {
        Loggers.logError.error('Error en home - Router - ' + error)
        error = {msj: `Ha ocurrido un error ${error}`}
        response.json(error)
    }
})

module.exports = routerHome