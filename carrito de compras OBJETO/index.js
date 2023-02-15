class Product {
    constructor(nombre, precio, annio) {
        this.nombre = nombre;
        this.precio = precio;
        this.annio = annio;
    }
}

class interfazUsuario {
    agregarProducto(producto) {
        const listaProducto = document.getElementById('listaProductos');
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body"> 
                    <strong>Nombre del Producto</strong>: ${producto.nombre}
                    <strong>Precio del Producto</strong>: ${producto.precio}
                    <strong>Año del Producto</strong>: ${producto.annio}
                    <input type="submit" value="Eliminar" class="btn btn-danger"/>
                </div>
            </div>
        `;
        listaProducto.appendChild(elemento);

    }

    resetearFormulario() {
        document.getElementById('formularioProducto').reset();
    }

    eliminarProducto(elemento) {
        if (elemento.value === "Eliminar") {
            elemento.parentElement.parentElement.parentElement.remove();
            this.mostrarMensaje('Producto eliminado correctamente', 'danger');
        }
    }

    mostrarMensaje(mensaje, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(mensaje));
        // Mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#aplicacion');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}


// eventos DOM
document.getElementById('formularioProducto').addEventListener('submit', function (e) {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const annio = document.getElementById('annio').value;

    const producto = new Product(nombre, precio, annio);

    const ui = new interfazUsuario();
    if (nombre === '' || precio === '' || annio === '') {
        ui.mostrarMensaje('Faltan datos por completar', 'danger');
        e.preventDefault();
    }
    else {
        ui.agregarProducto(producto);
        ui.resetearFormulario();
        ui.mostrarMensaje('Producto agregado correctamente', 'success');
        e.preventDefault();

    }


});

document.getElementById('listaProductos').addEventListener('click', function (e) {
    const ui = new interfazUsuario();
    ui.eliminarProducto(e.target);

})