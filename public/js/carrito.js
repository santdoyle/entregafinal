if(window.location.pathname == '/carrito/'){

    fetch('/carrito/listar')
    .then(resp => resp.json())
    .then(resp => {
        const producto = document.getElementById('producto')
        if(resp.msj === "No hay productos en el carro" ){

            producto.innerHTML = resp.msj
        
        }else{
            resp.forEach(el => {
                const prod = JSON.parse(el.producto)

                const resumen = `<!-- PRODUCT -->
                                        <div class="col-12 col-sm-12 col-md-2 text-center">
                                                <img class="img-responsive" src="${prod.imgUrl}" alt="prewiew" width="120" height="80">
                                        </div>
                                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                            <h4 class="product-name"><strong>${prod.nombre}</strong></h4>
                                            <h4>
                                                <small>${prod.descripcion}</small>
                                            </h4>
                                        </div>
                                        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                                                <h6><strong><span class="text-muted">$ARS</span> ${prod.precio}</strong></h6>
                                            </div>
                                            <div class="col-4 col-sm-4 col-md-4">
                                                <div class="quantity">
                                                    <input type="text" id="cantidad" value="0" class="qty"
                                                        size="2">
                                                </div>
                                            </div>
                                            <div class="col-2 col-sm-2 col-md-2 text-right">
                                                <button type="button" class="btn btn-outline-danger btn-xs" id="eliminar">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    <!-- END PRODUCT -->`
                    producto.innerHTML = resumen 


                    const eliminar = document.getElementById('eliminar')

                    eliminar.addEventListener('click', () => {
                        
                        fetch('/carrito/borrar/' + el._id, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(resp => resp.json())
                        .then(resp => {
                            location.reload();
                        })

                    })


                    const comprarProducto = document.getElementById('comprar')
                    const cantidad = document.getElementById('cantidad')
                    let qt = 0
                    cantidad.addEventListener('input', ()=> {
                        qt = cantidad.value
                    })

                    comprarProducto.addEventListener('click', async () => {
                        try {
                            const carrito = {
                                'pedido': el,
                                'cantidad': qt
                            }

                            const compra = await fetch('/carrito/comprar', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(carrito)
                            })

                            const json = await compra.json()

                            window.location.href = `/carrito/finalizar-compra/${json.id}`
                        } catch (error) {
                            throw new Error(error)
                        }
                    })
            });
        }
    })

}

 /**
     * Agregar producto al carro
    */

  const addCart = document.getElementById('addCart') 
  const item = document.getElementById('product').innerHTML

  addCart.addEventListener('click', async () => {
      const data = {
          id: item
      }

      try {
          const addToCart = await fetch('/carrito/agregar', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
  
          setTimeout(() => {
              window.location.href = '/carrito/'
          }, 500)
      } catch (error) {
          console.log(error)
      }
      
  })