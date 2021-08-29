const buscar = document.getElementById('botonBuscar')
const producto = document.getElementById('producto')
let div = document.createElement('div')

buscar.addEventListener('click', () => {
    const key = document.getElementById('buscar').value

    fetch('/productos/buscar/' + key, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.msj){

                producto.innerHTML = `<h4>${resp.msj}</h4>`
                
            }else{
                producto.innerHTML = `<div class="card shadow-sm">
                    <img src="${resp[0].imgUrl}">
                    <div class="card-body">
                    <h2>${resp[0].nombre}</h2>
                    <small id="idProducto">${resp[0].precio}</small>
                    <p class="card-text">${resp[0].descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <a href="/productos/listar/${resp[0].id}" id="verProducto" class="btn btn-sm btn-outline-secondary">Ver</a>
                            </div>
                            <small class="text-muted">Agregar al carrito</small>
                        </div>
                    </div>
                </div>`
            }
            
        })
        .catch(e => {
            throw new Error({error: 'Error al buscar el producto'})
        })
})