/* Variables*/
const lista_productos =[
    {
        id: 0,
        img: "./img/shop1.png",
        nombre: "Buzo Bunny LOVE ON TOUR",
        precio: 7500,
        stock: 100,
    },
    {
        id: 1,
        img: "./img/shop2.png",
        nombre: "Buzo TPWK LOVE ON TOUR",
        precio: 6000,
        stock: 100,
    },
    {
        id: 2,
        img: "./img/shop3.png",
        nombre: "Buzo LOVE ON TOUR",
        precio: 7500,
        stock: 100,
    },
    {
        id: 3,
        img: "./img/shop4.png",          
        nombre: "Buzo TPWK GLITTER",
        precio: 7500,
        stock: 100,
    },
    {
        id: 4,
        img:  "./img/shop5.png",        
        nombre: "Remera BUNNY LOVE",
        precio: 4000,
        stock: 100,
    },
    {
        id: 5,
        img: "./img/shop6.png",     
        nombre: "Remera DYKWAR",
        precio: 4000,
        stock: 100,
    },
    {
        id: 6,
        img: "./img/shop7.png",
        nombre: "Remera GOLDEN",                             
        precio: 4000,
        stock: 100,
    },
    {
        id: 7,
        img: "./img/shop8.png",
        nombre: "Remera LOVE ON TOUR",
        precio: 4000,
        stock: 100,
    },
    {
        id: 8,
        img: "./img/shop9.png",
        nombre: "Gorro HS IS MY FRIEND",
        precio: 3000,
        stock: 100,
    },
];

let carrito = [];
const tipoMoneda = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones


/* Cards Productos*/


function renderizadoProductos() {
    lista_productos.forEach((info) =>{
        /* Contenedor Card*/
        const contenedorCard = document.createElement('div');
        contenedorCard.classList.add('card', 'col-sm-4');
        /*Cuerpo Card */
        const cuerpoCard = document.createElement('div');
        cuerpoCard.classList.add('card-body');
        /*Titulo Card */
        const nombreCard = document.createElement('h5');
        nombreCard.classList.add('card-title');
        nombreCard.textContent = info.nombre;
         /*Imagen Card */
         const cardImagen = document.createElement('img');
         cardImagen.classList.add('img-fluid');
         cardImagen.setAttribute('src', info.img);
         /*Precio Card */
         const cardPrecio = document.createElement('p');
         cardPrecio.classList.add('card-text');
         cardPrecio.textContent = `${info.precio}$`;
           /*Boton Card */
           const cardBoton = document.createElement('button');
           cardBoton.classList.add('btn', 'btn-primary');
           cardBoton.textContent = '+';
           cardBoton.setAttribute('marcador', info.id);
           cardBoton.addEventListener('click', aggProductoAlCarrito);

           /*Injentar card HTML */
           cuerpoCard.appendChild(cardImagen);
           cuerpoCard.appendChild(nombreCard);
           cuerpoCard.appendChild(cardPrecio);
           cuerpoCard.appendChild(cardBoton);
           contenedorCard.appendChild(cuerpoCard);
           DOMitems.appendChild(contenedorCard);
    })
}

 /*Evento añadir producto al carrito*/
 function aggProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    /*Actualizamos el carrito*/
    renderizadoCarrito();

}

/*injectar Productos*/
function renderizadoCarrito() {
    /*limpiar html*/
    DOMcarrito.textContent = '';
    /*quitar duplicados*/
    const evitarDuplicados = [...new Set(carrito)];
    /*Nodos a partir del carrito*/
    evitarDuplicados.forEach((item) => {
        // traer item de array
        const productoItem = lista_productos.filter((itemlistaproductos) => {
        // comprobar que existe el id
            return itemlistaproductos.id === parseInt(item);
        });
        // Contador cantidad de productos que se repiten
        const numeroDeProductos = carrito.reduce((total, itemId) => {
         // si coinciden los id aumenta cantidad, si no la mantiene
            return itemId === item ? total += 1 : total;
        }, 0);
        // crear producto en el  carrito
        const productoEnCarrito = document.createElement('li');
        productoEnCarrito.classList.add('list-group-item', 'text-right', 'mx-2');
        productoEnCarrito.textContent = `${numeroDeProductos} x ${productoItem[0].nombre} - ${productoItem[0].precio}${tipoMoneda}`;
        // Borrar productos Carrito
        const botonBorrar = document.createElement('button');
        botonBorrar.classList.add('btn', 'btn-danger', 'mx-5');
        botonBorrar.textContent = 'X';
        botonBorrar.style.marginLeft = '1rem';
        botonBorrar.dataset.item = item;
        botonBorrar.addEventListener('click', borrarItemCarrito);
        
        productoEnCarrito.appendChild(botonBorrar);
        DOMcarrito.appendChild(productoEnCarrito);
    });

     //precio total  HTML
     DOMtotal.textContent = calcularTotal();
}



/*Evento borrar 1 elemento del carrito*/
function borrarItemCarrito(evento) {
    // Obtener producto ID 
    const id = evento.target.dataset.item;
    // Borrar productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volver a renderizar
    renderizadoCarrito();
}

/*Calcular Precio Total*/
function calcularTotal() {
    // Recorre array carrito
    return carrito.reduce((total, item) => {
        // Filtrado Precio de cada elemento
        const productoItem = lista_productos.filter((itemlistaproductos) => {
            return itemlistaproductos.id === parseInt(item);
        });
        //  suma  total
        return total  + productoItem[0].precio;
    }, 0).toFixed(2);
}

/*Vaciar Carrito para volver a injectarlo*/
function vaciarCarrito() {
    // Limpiar productos guardados
    carrito = [];
    // Renderizar cambios
    renderizadoCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Algoritmo





renderizadoProductos();
renderizadoCarrito();
