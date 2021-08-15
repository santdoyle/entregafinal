/*
    * Listar todos los productos
*/
const getProductos = async () => {
    const data = await fetch('/productos/listar')
    const response = data.json();
    return response
}

getProductos().then(resp => {
    
    if(resp.msj === "No hay productos añadidos"){
        //Si no hay productos muestro mensaje
        const container = document.getElementById("contenedor")
        container.innerHTML = `<h4>No hay productos añadidos<h4>`
    
    }else{
        const producto = document.getElementById("producto")

        //Creo un elemento para cada nuevo producto
        resp.forEach(element => {
            let id = element.id ?? element.idProducto
            
            let div = document.createElement('div')
            
            div.innerHTML = `<div class="card shadow-sm">
                                <img src="${element.imgUrl}">
                                <div class="card-body">
                                <h2>${element.nombre}</h2>
                                <small id="idProducto">${element.precio}</small>
                                <p class="card-text">${element.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                    <button type="button" id="verProducto-${id}" class="btn btn-sm btn-outline-secondary">Ver</button>
                                    </div>
                                    <small class="text-muted">Agregar al carrito</small>
                                </div>
                                </div>
                            </div>`
            div.className = "col"
            producto.appendChild(div)

            /*
                * Ver producto por ID - Editar y Borrar
            */
            const botonVer = document.getElementById(`verProducto-${id}`)
            const container = document.getElementById("contenedor")
            
            /* */
            botonVer.addEventListener('click', () => {

                //Fetch para trear infrmación del prodcuto segun id
                const getProductoByID = async () => {
                    const data = await fetch('/productos/listar?id=' + id)
                    const respuesta = await data.json()

                    return respuesta
                }

                //Cambio el template para mostrar detalles del producto
                getProductoByID().then(resp => {
                                        
                    /* 
                        * Actualizar Producto
                    */
                    const editar = document.getElementById('editar')
                    
                    editar.addEventListener('click', () => {
                        id = resp[0].id ?? resp[0].idProducto

                        const form = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">  
                                       
                                        <div class="form-group">
                                            <label>ID</label>
                                            <input class="form-control" type="text" id="id" name="id" value="${id}">
                                        </div>
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input class="form-control" type="text" id="nombre" name="nombre" value="${resp[0].nombre}">
                                        </div>
                                        <div class="form-group">
                                            <label>Descripción del producto</label>
                                            <input type="text" class="form-control" id="descripcion" name="descripcion" value="${resp[0].descripcion}">
                                        </div>
                                        <div class="form-group">
                                            <label>Codigo</label>
                                            <input class="form-control" type="text" id="codigo" name="codigo" value="${resp[0].codigo}">
                                        </div>
                                        <div class="form-group">
                                            <label>Url de imagen</label>
                                            <input class="form-control" type="text" id="imgUrl" name="imgUrl" value="${resp[0].imgUrl}">
                                        </div>
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input class="form-control" type="text" id="precio" name="precio" value="${resp[0].precio}">
                                        </div>
                                        <div class="form-group">
                                            <label>Stock</label>
                                            <input class="form-control" type="text" id="stock" name="stock" value="${resp[0].stock}">
                                        </div>
                                        <button type="submit" id="actualizar" class="btn btn-primary" data-dismiss="modal">Agregar</button>
                                    </div>
                                    `

                        container.innerHTML = form

                        const actualizar = document.getElementById('actualizar')

                        actualizar.addEventListener('click', () => {
                            const id = document.getElementById('id').value
                            const nombre = document.getElementById('nombre').value
                            const descripcion = document.getElementById('descripcion').value
                            const codigo = document.getElementById('codigo').value
                            const imgUrl = document.getElementById('imgUrl').value
                            const precio = document.getElementById('precio').value
                            const stock = document.getElementById('stock').value

                            const data = {
                                nombre: nombre,
                                descripcion: descripcion,
                                codigo: codigo,
                                imgUrl: imgUrl,
                                precio: precio,
                                stock: stock
                            }

                            console.log(id)

                            fetch('/productos/actualizar/' + id, {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(resp => resp.json)
                                .then(resp => console.log(resp))

                            window.location.assign('/tienda')
                        })
                    })
                        

                    /* 
                        * Borrar producto
                    */
                    const borrar = document.getElementById('borrar')

                    borrar.addEventListener('click', () => {

                        fetch(`/productos/borrar/${id}`, {
                            method: 'DELETE',
                        })
                        .then(resp => resp.json())
                        .then(resp => {
                            container.innerHTML = resp + '<a href="/tienda/">  Volver a la tienda</a>'
                        })

                        //window.location.assign('/tienda')
                    })
                })
            })
            
        });
    }
    
    
})