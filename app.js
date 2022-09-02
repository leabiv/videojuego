const formulario = document.getElementById('formulario');
const cartas = document.getElementById('cartas');
const carrito = document.getElementById('carrito');
let arrayVJ = JSON.parse(localStorage.getItem('videojuego')) ?? [];

verJuegos();

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    capturarDatos()
    verJuegos();
})

function capturarDatos() {

    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const anio = document.getElementById('anioSalida').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    validarCamposFormulario(nombre, tipo, anio, precio, imagen);
    localStorage.setItem('videojuego', JSON.stringify(arrayVJ));
}

function validarCamposFormulario(nombre, tipo, anio, precio, imagen) {
    let ExpRegLetrasEspacio = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    let ExpRegSoloNumeros = /^-{0,1}\d*\.{0,1}\d+$/;

    if (nombre.length == 0 || anio == null) {
        alert('Nombre del Videojuego o la Fecha no fue ingresada')
        return
    }
    if (nombre.match(ExpRegLetrasEspacio) != null &&
        tipo.match(ExpRegLetrasEspacio) != null &&
        precio.match(ExpRegSoloNumeros) != null) {

        let newVideojuego = {
            nombreVideojuego: nombre,
            tipoVideojuego: tipo,
            anioVideojuego: anio,
            precioVideojuego: precio,
            imagenVideojuego: imagen
        }

        arrayVJ.push(newVideojuego);
    }
}

function verJuegos() {

    //let nuevoArray = JSON.parse(localStorage.getItem('videojuego'));
    let contenido = '';
    arrayVJ.forEach(element => {
        contenido += `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${element.imagenVideojuego}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombreVideojuego}</h5>
                        <p class="card-text">${element.tipoVideojuego}</p>
                        <p class="card-text">${element.anioVideojuego}</p>
                        <p class="card-text">${element.precioVideojuego}</p>
                        <button onclick="agregarCarrito('${element.nombreVideojuego}')" class="btn btn-primary">Agregar Carrito</button>
                    </div>
            </div>
        </div>`;
    });
    cartas.innerHTML = contenido;
}

function agregarCarrito(nombreVjuego){
    let inf = JSON.parse(localStorage.getItem('videojuego'));
    //let datoReflejado = inf.find((elem) => elem.id == id)
    let datosVideojuego = '';
    inf.forEach((elem) => {
        if (elem.nombreVideojuego == nombreVjuego) {
            datosVideojuego +=
                `<tr>
                <th scope="row">#</th>
                <td>${elem.nombreVideojuego}</td>
                <td>${elem.precioVideojuego}</td>
                <td>${elem.tipoVideojuego}</td>
                <td>${elem.anioVideojuego}</td>
            </tr>
            `;
        }
    });
    carrito.innerHTML += datosVideojuego;
}