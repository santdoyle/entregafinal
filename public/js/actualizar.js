/* 
* Actualizar Producto
*/

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

    fetch('/productos/actualizar/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json)
        .then(resp => resp)

    window.location.href = '/'
})