const eliminar = document.getElementById('borrar');
const id = document.getElementById('productoID').innerHTML

eliminar.addEventListener('click', async () => {
    try {
        const borrar = await fetch('/productos/borrar/' + id, {
            method: 'DELETE'
        })
    
        const borrarJson = await borrar.json()
    
        window.location.href = '/'
    } catch (error) {
        throw new Error(error)
    }
    

})
