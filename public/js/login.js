if(window.location.pathname == '/login'){
    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value
    const send = document.getElementById('enviar')
    console.log(email)
    send.addEventListener('click', async (e) => {
        e.preventDefault()

        const login = {
            email: email,
            password: pass,
        }
        console.log(login)
        /*const apiCall = await fetch('/setLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })

        const resp = await apiCall.json()
        console.log(resp)*/
    })
}