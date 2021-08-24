if(window.location.pathname.match(/chat/)){

    const socket = io()

    //Muestro los usuarios conectados
    const emisor = document.getElementById('emisor')
    const emisorID = document.getElementById('emisorID')

    //Selectores dentro del chat
    const conectados = document.getElementById('conectados')
    const online = document.getElementById('online')
    const receptor = document.getElementById('receptor')
    const receptorID = document.getElementById('receptorID')

    //Defino el nombre del usuario actual
    const userShow = document.getElementById('user')
    const usuario = window.location.pathname.replace('/chat/', '')
    userShow.innerHTML = usuario

    //Cambio el front segun el user
    const nota = document.getElementById('nota')
    const sidebar = document.getElementById('aside')
    const panel = document.getElementById('panel')

    if(usuario !== 'admin'){
        sidebar.remove()
        panel.classList.remove('col-9')
        panel.classList.add('col-12')
        nota.innerHTML = "<h5>Comunicate con atenciónal cliente</h5>"
        receptor.innerHTML = '<strong>Atención al cliente</strong>'
    }

    socket.on('connect', () => {
        
        socket.emit('login', {
            email: usuario,
            userId: socket.id
        })
        
        online.innerHTML = 'No hay usuarios conectados'
    })

    /**
     *  DevMode
     */
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });



    socket.on('conectados', data => {
        
        //Imprimo los usuarios conectados
        const divOnline = document.createElement('div')
        divOnline.classList.add('onlineUser')
        const ficha = `<a href="${data.socketId}" id="id-${data.socketId}" class="online">
                            <div class="text-muted" id="emisor">
                                ${data.user}
                                
                            </div>
                        </a>`
    
        divOnline.innerHTML = ficha
        online.innerHTML = ''
        conectados.append(divOnline)

        const responder = document.getElementById(`id-${data.socketId}`)
        
        //Obtengo los mensajes por usuario conectado
        responder.addEventListener('click', (e) => {
        
            e.preventDefault()
            nota.remove()
            receptor.innerHTML = data.user
            receptorID.innerHTML = data.socketId

            const getMensajes = {
                de: usuario,
                deID: socket.id,
                para: receptor.innerHTML,
                paraID: receptorID.innerHTML
            }

            chat.innerHTML = ''
            socket.emit('get mensajes', getMensajes)
        })
    
    })

    const botonEnviar = document.getElementById('enviar')

    //Capto mensajes y emisor
    const userMensaje = document.getElementById('userMsg')
    const userSend = document.getElementById('userSend')
    const chat = document.getElementById('chat')

    //Envio de mensajes por chat

    enviar.addEventListener('click', (e) => {
        const mensaje = document.getElementById('mensaje').value

        e.preventDefault()
        const data = {
            mensaje: mensaje,
            de: usuario,
            deID: receptorID.innerHTML,
            para: receptor.innerHTML || 'admin',
            paraID: receptorID.innerHTML,
            fecha: Date.now()
        }

        socket.emit('mensaje user', data)

        mostrarMensajes(data)

        this.mensaje.value = ''

    })

    //Imprimo la respuesta del server
    socket.on('privado user', data => {
        console.log(data)
        mostrarMensajes(data)
    })

    socket.on('listar mensajes', data => {
        console.log(data)
        if(data.msj == 'No hay mensajes'){
            chat.innerHTML = `<h5 style="text-align: center">${data.msj}</h5>`
        }else{
            data.forEach(el => {
                mostrarMensajes(el)
            })
        }
        
    })


    function mostrarMensajes(data){
        const div = document.createElement('div')
        div.classList.add('message-bubble')
        
        const conversacion = `<span class="text-muted" style="font-size: 10px" id="userSend">${data.de}</span>
                            <span class="mensaje"  id="socketID">${data.mensaje}</span>
                            <span id="userMsg"></span>`

        div.innerHTML = conversacion
        chat.append(div)

        nota.remove()
    }

}