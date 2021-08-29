const express = require('express');
const App = express()
const http = require('http').Server(App)
const io = require('socket.io')(http)
require('./src/utils/websockets')(io)

const cluster = require('cluster')
const CPUs = require('os').cpus().length
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const path = require('path')
const flash = require('connect-flash')
const Loggers = require('./src/utils/logsConfig')

const {config} = require('./config')

/**
 * Import de routers
 */
const routerProductos = require('./src/routes/routerProductos.js')
const routerCarrito = require('./src/routes/routerCarrito.js')
const routerHome = require('./src/routes/routerHome.js')
const routerLogin = require('./src/routes/routerLogin')
const routerRegistro = require('./src/routes/routerRegistro')
const routerChat = require('./src/routes/routerChat')
require('./src/auth/passportLocal')

App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use(flash());

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
App.use(session({
    store: MongoStore.create({
        mongoUrl: config.URLSAS,
        mongoOptions: advancedOptions
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
   /* cookie: {
        maxAge: 60 * 1000
    }*/
}))
App.use(passport.initialize())
App.use(passport.session())
App.use(cookieParser())

/**
 * Rutas
 */
App.use('/productos', routerProductos);
App.use('/carrito', routerCarrito)
App.use('/', routerHome)
App.use(routerLogin)
App.use(routerRegistro)
App.use('/chat', routerChat)
App.use('/tienda', express.static('public'))

App.set('view engine', 'ejs')
App.set('views', path.join(__dirname + '/src/views'))

const PORT = config.PORT || 3030
const modo = config.MODO

if(modo === 'CLUSTER'){
    
    if(cluster.isMaster){
        Loggers.logInfo.info(`Master ${process.pid} is running`)


        for (let i = 0; i < CPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            Loggers.logInfo.info(`Worker ${worker.process.pid} died`)
        })
    }else {

        //Inicio el servidor
        const server = http.listen(PORT, () => {
            Loggers.logInfo.info(`Servidor funcionando en ${server.address().port}`)

        })
        .on('error', error => {
            Loggers.logError.error(`Error al conectar el servidor: ${error}`)
        })

    }
}else{

    //Puerto 8080 para dev, process.env.PORT para produccion
    const server = http.listen(PORT, () => {
        Loggers.logInfo.info(`Servidor funcionando en ${server.address().port}`)

    })
    .on('error', error => {
        Loggers.logError.error(`Error al conectar el servidor: ${error}`)
    })
    
}


module.exports = App
