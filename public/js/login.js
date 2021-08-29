const alertas = document.getElementById('alertas')
    
    async function login(){
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const user = {
            email: email,
            password: password
        }

        const send = await fetch('/setLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        
        const json = await send.json()
        
        if(json.info.message.error){
            alertas.innerHTML = `<div class="alert alert-danger">
                                    ${json.info.message.error}
                                </div>`
            
        }else{
            console.log('llega')
            alertas.innerHTML = `<div class="alert alert-success">
                                    ${json.info.message.success}. Te estamos redirigiendo.
                                </div>`
            setTimeout(() => {
                window.location.href = `/`
            }, 2000)
        }
    }

