const chatController = require('../controllers/controllerChat')
const Loggers = require('./logsConfig')

const Chat = new chatController()

let adminId = ''

module.exports = function (io){
    //Inicio de Websocket
    io.on('connection', socket => {
        
        //Envío al cliente los usuarios conectados
        socket.on('login', data => {
            
            console.log(socket.connected)

            const user = {
                'user': data.email,
                'socketId': data.userId
            }
            if(data.email === 'admin') adminId = data.userId
            if(socket.connected === true) {
                //io.sockets.emit('conectados', user)
                socket.to(adminId).emit('conectados', user)
            }
            
            
        });
       
        //Guardo mensajes y respondo por privado
        socket.on("mensaje user", data => {
            if(data.paraID == ''){
                data.paraID = adminId
            }
            //Guardar mensajes en DB
            Chat.guardarMensajes(data)

            //console.log(data)
            if (data.de !== 'admin') {
                socket.to(adminId).emit("privado user", data);
            } else {
                socket.to(data.paraID).emit("privado user", data);
            }
        });

        //Obtengo los mensajes de db por usuario
        socket.on('get mensajes', async data => {0
            //console.log(data)
            try {
                const resp = await Chat.listarMensajes(data.de, data.para)
                
                if(resp.length > 0){
                    socket.to(data.paraID).emit("listar mensajes", resp);
                    socket.to(adminId).emit("listar mensajes", resp);

                }else{
                    socket.to(data.paraID).emit("listar mensajes", {msj: 'No hay mensajes'});
                }

                //io.sockets.emit("listar mensajes", mensajes)

            } catch (error) {
               Loggers.logError.error('Error en socket.on - Get Mensajes' + error)
            }
            
            
        })

    })
}