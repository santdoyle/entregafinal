if(window.location.pathname == '/chat/admin'){
    const socket = io()

    socket.on('private message', data => {
        console.log('p', data)
    })
}
