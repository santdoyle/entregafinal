const nodemailer = require('../utils/mailingConfig').transporter
const id = "AC76d875d35934820d6f8ee9482eff2e56"
const token = "fe705754fc9677cb9e1862151787ced2"
const client = require('twilio')(id, token)
const Productos = require('../controllers/controllerProductos')
const controllerUsers = require('../controllers/controllerUsers')
const Loggers = require('../utils/logsConfig')

const emailAdmin = "carmelo91@ethereal.email"

class controllerNotificaciones{

    sendEmail(options){
        try {
            nodemailer.sendMail(options, (err, info) => {
                if(err){
                    Loggers.logError.error(`Error al enviar SMS: ${err}`)
                }
    
                Loggers.logInfo.info('Email enviado correctamente')
            })
        } catch (error) {
            Loggers.logError.error(`Error al enviar Email: ${error}`)
        }
        
    }

    newUserNot(data){
        try {
            const mensaje = `<h1>Nuevo registro: ${data.email}</h1>
                            <ul>
                                <li>Nombre: ${data.nombre}</li>
                                <li>Apellido: ${data.apellido}</li>
                                <li>Email: ${data.email}</li>
                                <li>Teléfono: ${data.telefono}</li>
                                <li>Fecha: ${data.fecha}</li>
                            </ul>`

            const options  = {
                from: emailAdmin,
                to: data.email,
                subject: 'Nuevo Registro',
                html: mensaje,
            }

            this.sendEmail(options)

        } catch (error) {
            Loggers.logError.error(`Error al enviar email: ${error}`)
        }
        
    }

    async newBuyNot(data){
        try {
            const producto = JSON.parse(data.producto)

            //Busco el producto según su id
            const buscarProducto = new Productos()
            const productoID = await buscarProducto.listarProductosPorID(producto._id)

            //Busco los datos del usuario por id
            const users = new controllerUsers()
            const usuario = await users.usuarioPorID(data.user)
            
            const mensaje = `<h1>Nueva Compra realizada: ${productoID[0].nombre}</h1>
                            <h5>Datos del producto</h5>
                                <ul>
                                    <li>Nombre: ${productoID[0].nombre}</li>
                                    <li>Precio: ${productoID[0].precio}</li>
                                </ul>
                            <h5>Datos del usuario</h5>
                                <ul>
                                    <li>Nombre: ${usuario[0].nombre}</li>
                                    <li>Apellido: ${usuario[0].apellido}</li>
                                    <li>Email: ${usuario[0].email}</li>
                                    <li>Teléfono: ${usuario[0].telefono}</li>
                                </ul>`

                                console.log('usuario', usuario[0].email)

                const options  = {
                    from: emailAdmin,
                    to: usuario[0].email,
                    subject: 'Compra de' + productoID[0].nombre,
                    html: mensaje,
                }

                this.sendEmail(options)
                this.sendSMS(mensaje)
                this.userSMSnot()
        } catch (error) {
            Loggers.logError.error(`Error notificación de nueva compra: ${error}`)

        }
        
    }


    async sendSMS(mensaje){
        try {
            const sendSms = await client.messages.create({
                body: mensaje,
                from: 'whatsapp:+13343263397',
                to: 'whatsapp:+13343263397'
            })
    
            Loggers.logInfo.info(`Mensaje enviado correcatamente: ${sendSms}`)
        } catch (error) {
            Loggers.logError.error(`Error al enviar SMS: ${error}`)

        }
        
    }

    async sendSMS(mensaje){
        try {
            const sendSms = await client.messages.create({
                body: mensaje,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+13343263397'
            })
    
            Loggers.logInfo.info(`Mensaje enviado correcatamente: ${sendSms}`)
        } catch (error) {
            Loggers.logError.error(`Error al enviar SMS: ${error}`)

        }
        
    }

    async userSMSnot(){
        const mensaje = 'Su compra fue realizada con exito'

        try {
            const sendSms = await client.messages.create({
                body: mensaje,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+542284508048'
            })
    
            console.log(sendSms)
        } catch (error) {
            Loggers.logError.error(`Error al enviar SMSa usuario: ${error}`)
        }
        
    }

}

module.exports = controllerNotificaciones