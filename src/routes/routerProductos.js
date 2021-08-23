const express = require('express');
const path = require('path')
const passport = require('passport')
const Productos = require('../controllers/controllerProductos.js')
const routerProductos = express.Router()
const authenticate = require('../auth/isAuthorized')
const Loggers = require('../utils/logsConfig')
const mongoose = require('mongoose')

//Variables globales
let administrador = true;
let carritoCompras = []

const productos = new Productos()

//Listar todos los productos
routerProductos.get('/listar', async (request, response, next) => {
    try{            

        const getAll = await productos.listarTodos()
        response.render('index', {
            data: getAll,
        })
        
    } catch (error) {
        Loggers.logError.error(`Error al listar productos: ${error}`)
        error = {msj: `Ha ocurrido un error ${error}`}
        
        response.json(error)

    }
})

//Listar producto por ID
routerProductos.get('/listar/:id', async (request, response) => {
    try {
        const idValido = mongoose.Types.ObjectId.isValid(request.params.id);
        
        if(idValido === true){

            const item = await productos.listarProductosPorID(request.params.id)
            response.render('ficha', {
                data: item,
            })
        
        }else{
            Loggers.logError.error(`Error al listar por id - Router`)
            response.status(401).json({error: 'El id ingresado no es correcto.'})
        } 
    } catch (error) {
        Loggers.logError.error(`Error al listar por id - Router - ${error}`)
        response.status(401).json({error: 'Ocurrio un error'})
    }
    
})

//Listar por categoria
routerProductos.get('/categoria/:categoria', async (request, response) =>{
    try {

        const {categoria} = request.params
        const getAll = await productos.buscarPorCategoria(categoria)
        
        response.render('index', {
            data: getAll,
        })

    } catch (error) {
        Loggers.logError.error(`Error al buscar por categoría - Router - ${error}`)
        response.status(401).json({error: 'Ocurrio un error.'})
    }
    
})


/*Vista publicar producto*/
routerProductos.get('/publicar', authenticate, (request, response) => {

    response.render('publicarProducto')
})


//Endpoint publicar producto
let id = 0
routerProductos.post('/agregar', (request, response, next) => {
    
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
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
    
})

routerProductos.get('/editar/:id', async (request, response) => {
    try {
        const item = await productos.listarProductosPorID(request.params.id)

        response.render('editar', {data: item})
    } catch (error) {
        Loggers.logError.error(`Error al editar producto: ${error}`)
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
    
    
})

//Actualizar producto por ID
routerProductos.put('/actualizar/:id', async (request, response, next) => {
    
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
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
    
})


//Eliminar producto por ID
routerProductos.delete('/borrar/:id', (request, response, next) => {
    
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
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
    
})


routerProductos.get('/buscar/:key', async (request, response) => {
    const {key} = request.params
    try {
        const item = await productos.buscarPor(key)

        response.json(item)

    } catch (error) {
        Loggers.logError.error(`Error al buscar productos: ${error}`)
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
})


routerProductos.get('/ordenar/:key', async (request, response) => {
    const {key} = request.params

    try {
        const item = await productos.ordenarPor(key)

        response.json(resp)

    } catch (error) {
        Loggers.logError.error(`Error al ordenar productos: ${error}`)
        error = {msj: `Ha ocurrido un error.`}

        response.json(error)
    }
})

module.exports = routerProductos