const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js')
//const listado = require('./routerProductos.js').listadoProductos
const routerHome = express.Router()
const authorized = require('../auth/isAuthorized')

routerHome.get('/', authorized, (request, response) => {
    try{
        console.log(request.headers)
        const productos = new Productos()
        const getAll = productos.listarTodos()

        getAll.then(resp => {
            response.render('index', {data: resp})
        })
        
    } catch (error) {
        console.log(error)
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

module.exports = routerHome