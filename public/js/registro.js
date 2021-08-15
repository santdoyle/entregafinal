const password = document.getElementById('passwordRegistro')
const repetPassword = document.getElementById('repetPassword')
const mensajeAlert = document.getElementById('passwordAlert')
const enviar = document.getElementById('enviar')
const mostrarBoton = document.getElementById('mostrarBoton')

let passValue = ''
let repetPassValue = ''

password.addEventListener('input', () => {
    passValue = password.value
    checkPass(passValue, repetPassValue)
})

repetPassword.addEventListener('input', () => {
    repetPassValue = repetPassword.value
    checkPass(passValue, repetPassValue)
})

function checkPass(passValue, repetPassValue){
    if(passValue === '' && repetPassValue === ''){
        mensajeAlert.innerHTML = `<div class="alert alert-warning">
                                    La contraseña no puede estar vacia
                                  </div>`
    
    }else if(passValue !== repetPassValue){
        mensajeAlert.innerHTML = `<div class="alert alert-warning mt-2">
                                    Las contraseñas deben coincidir
                                  </div>`
        mostrarBoton.style.display = 'none'                          
        
    }else{
        mensajeAlert.innerHTML = `<div class="alert alert-success mt-2">
                                    Las contraseñas coinciden
                                  </div>`

        mostrarBoton.style.display = 'block'      
        mostrarBoton.innerHTML = `<button type="submit" id="enviar" class="btn btn-primary">
                                    Crear cuenta
                                  </button>`
    }


}
