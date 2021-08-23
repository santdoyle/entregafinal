const express = require('express');
const App = express()
const http = require('http').Server(App)
const io = require('socket.io')(http)
require('./src/utils/chatSocket')(io)

const cluster = require('cluster')
const CPUs = require('os').cpus().length

const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const path = require('path')
const flash = require('connect-flash')
const Loggers = require('./src/utils/logsConfig')
const {config} = require('./config')

//import de rutas
const routerProductos = require('./src/routes/routerProductos.js')
const routerCarrito = require('./src/routes/routerCarrito.js')
const routerHome = require('./src/routes/routerHome.js')
const routerLogin = require('./src/routes/routerLogin')
const routerRegistro = require('./src/routes/routerRegistro')
const routerChat = require('./src/routes/routerChat')
require('./src/auth/passportLocal')

App.use(express.json())
App.use(express.urlencoded({extended: true, limit: '50mb'}))
App.use(flash());
App.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://santdoyle:12345@cluster0.1j600.mongodb.net/myFirstDatabase',
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
App.use(cors())
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

App.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Inicio de Servidor
const PORT = config.PORT || 3030
const modo = 'FORK'

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
