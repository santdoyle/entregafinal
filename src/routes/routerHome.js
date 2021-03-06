const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js')
//const listado = require('./routerProductos.js').listadoProductos
const routerHome = express.Router()
const authorized = require('../auth/isAuthorized')

routerHome.get('/', authorized, (request, response) => {
    try{
        const token = request.query.token
        
        const productos = new Productos()
        const getAll = productos.listarTodos()
        
        getAll.then(resp => {
            response.render('index', {data: resp})
        })
        
    } catch (error) {
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

module.exports = routerHome