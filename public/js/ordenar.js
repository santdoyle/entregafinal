if(window.location.pathname == '/'){
    const filtro = document.getElementById('filtro')
    const listaProductos = document.getElementById('producto')
    const container = document.getElementById('contenedor')
    const tarjeta = document.getElementById('tarjeta')

    let asd = document.createElement('div')

    filtro.addEventListener('change', () => {
        const key =  filtro.value

        fetch('/productos/ordenar/' + key, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            if(tarjeta){
                tarjeta.remove()
            }
            resp.forEach(element => {
                console.log(element)
                div.innerHTML = `<div class="card shadow-sm" id="tarjeta">
                                    <img src="${element.imgUrl}">
                                    <div class="card-body">
                                    <h2>${element.nombre}</h2>
                                    <small id="idProducto">${element.precio}</small>
                                    <p class="card-text">${element.descripcion}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                        <button type="button" id="verProducto-${element.id}" class="btn btn-sm btn-outline-secondary">Ver</button>
                                        </div>
                                        <small class="text-muted">Agregar al carrito</small>
                                    </div>
                                    </div>
                                </div>`
            div.className = "col"
            
            listaProductos.appendChild(div)

            })
            
        })
    })
}