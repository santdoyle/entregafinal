const express = require('express');
const path = require('path')
const Productos = require('../controllers/controllerProductos.js')
const routerProductos = express.Router()
const authenticate = require('../auth/isAuthorized')
const Loggers = require('../utils/logsConfig')

//Variables globales
let administrador = true;
let carritoCompras = []

const productos = new Productos()

//Listar todos los productos
routerProductos.get('/listar', authenticate, (request, response, next) => {

    try{            
        
        const getAll = productos.listarTodos()
        getAll.then(resp => {
            response.render('index', {data: resp})
        })
        
    } catch (error) {
        Loggers.logError.error(`Error al listar productos: ${error}`)
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

//Listar producto por ID
routerProductos.get('/listar/:id', authenticate, (request, response) => {
    if(request.params.id){
        const item = productos.listarProductosPorID(request.params.id)

        item.then(resp => {
            response.render('ficha', {data: resp})
        })
    
    }
})

/*Vista publicar producto*/
routerProductos.get('/publicar', authenticate, (request, response) => {
    response.render('publicarProducto')
})


//Endpoint publicar producto
let id = 0
routerProductos.post('/agregar', authenticate, (request, response, next) => {
    
    try {
        if(administrador === true){
            productos.agregarProducto(request.body, id++)
            response.json('Producto añadido correctamente')
        }else{
            const error = {
                    error: "-1",
                    descripcion: '/productos/agregar POST no autorizado'
            }
            
            response.status(401)
            response.json(error)
        }
    
    } catch (error) {
        Loggers.logError.error(`Error al agregar producto: ${error}`)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})

routerProductos.get('/editar/:id', authenticate, (request, response) => {
    
    const item = productos.listarProductosPorID(request.params.id)

    item.then(resp => {
        response.render('editar', {data: resp})
    })
    
})

//Actualizar producto por ID
routerProductos.put('/actualizar/:id', authenticate, async (request, response, next) => {
    
    try {
        if(administrador === true){
            const respuesta = await productos.actualizarProducto(request.params.id, request.body)
            
            response.json('Producto actualizado correctamente')     
        }else{
            const error = {
                error: "-1",
                descripcion: '/productos/actualizar PUT no autorizado'
            }
        
            response.status(401)
            response.json(error)
        }
    
    } catch (error) {
        Loggers.logError.error(`Error al actualizar producto: ${error}`)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})


//Eliminar producto por ID
routerProductos.delete('/borrar/:id', authenticate, (request, response, next) => {
    
    try {
        if(administrador === true){
            let eliminado = productos.borrarProducto(request.params.id)
            
            eliminado.then(resp => {
                response.json(resp.msj)
            })
            
        }else{
            const error = {
                error: "-1",
                descripcion: '/productos/borrar DELETE no autorizado'
            }
        
            response.status(401)
            response.json(error)
        }
        
    } catch (error) {
        Loggers.logError.error(`Error al borrar producto: ${error}`)
        error = {msj: `Ha ocurrido un error ${error}`}

        response.json(error)
    }
    
})


routerProductos.get('/buscar/:key', authenticate, (request, response) => {
    const key = request.params.key
    console.log(key)
    try {
        const item = productos.buscarPor(key)

        item.then(resp => {
            response.json(resp)
        })

    } catch (error) {
        Loggers.logError.error(`Error al buscar productos: ${error}`)

    }
})


routerProductos.get('/ordenar/:key', authenticate, (request, response) => {
    const key = request.params.key

    try {
        const item = productos.ordenarPor(key)

        item.then(resp => {
            response.json(resp)
        })

    } catch (error) {
        Loggers.logError.error(`Error al ordenar productos: ${error}`)

    }
})


module.exports = routerProductos