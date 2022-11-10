const eliminarProductoCarrito = (id) =>
{
	const encontrar = carrito.find((element) => element.id === id)
	carrito = carrito.filter((carritoId) => { return carritoId !== encontrar })

	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Producto eliminado',
		showConfirmButton: false,
		timer: 600
	})

	dibujarCarrito()
	guardarLocalStorage()
	carritoContador()
	carritoCero()
	
}

const cerrarCarrito = () =>
{
	modalContainer.style.display = "none"
}

const dibujarCarrito = () => 
{
	modalContainer.innerHTML = ""
	modalContainer.style.display = "flex"

	const modalHeader = document.createElement("div")
	modalHeader.classList.add("modal-header")
	modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito de compras</h1>  `
	modalContainer.append(modalHeader)

	const modalButton = document.createElement("h1")
	modalButton.textContent = "X"
	modalButton.classList.add("modal-header-button")
	modalHeader.append(modalButton)

	modalButton.addEventListener("click", () =>
	{
		cerrarCarrito();
	})

	carrito.forEach((product) =>
	{
		let imagen = document.createElement("img");
		imagen.src = product.imagen;
		imagen.alt = product.nombre;

		let h3 = document.createElement("h3");
		h3.textContent = product.nombre;

		let pPrecio = document.createElement("p");
		pPrecio.classList.add("price2");
		pPrecio.textContent = "$" + product.precio;

		let botonResta = document.createElement("span");
		botonResta.classList.add("resta");
		botonResta.textContent = ' - ';

		let pCantidad = document.createElement("p");
		pCantidad.textContent = product.cantidad;

		let botonSuma = document.createElement("span");
		botonSuma.classList.add("suma");
		botonSuma.textContent = ' + ';

		let pTotal = document.createElement("p");
		pTotal.textContent = "Total: $" + product.precio * product.cantidad;

		let mostrarCarrito = document.createElement("div")
		mostrarCarrito.classList.add("modal-content")

		mostrarCarrito.appendChild(imagen);
		mostrarCarrito.appendChild(h3);
		mostrarCarrito.appendChild(pPrecio);
		mostrarCarrito.appendChild(botonResta);
		mostrarCarrito.appendChild(pCantidad);
		mostrarCarrito.appendChild(botonSuma);
		mostrarCarrito.appendChild(pTotal);

		let botonEliminardelCarrito = document.createElement("span")
		botonEliminardelCarrito.innerText = "❌"
		botonEliminardelCarrito.classList.add("delete-product")

		botonEliminardelCarrito.addEventListener("click", () =>
		{
			/* alertEliminar(product.id) */
			eliminarProductoCarrito(product.id)
		})

		mostrarCarrito.appendChild(botonEliminardelCarrito)
		modalContainer.appendChild(mostrarCarrito)

		botonResta.addEventListener("click", () =>
		{
			if (product.cantidad > 1)
			{
				product.cantidad -= 1
				dibujarCarrito()
			}
		})

		botonSuma.addEventListener("click", () =>
		{
			if (product.cantidad >= 1 && product.cantidad < 10)
			{
				product.cantidad += 1
				dibujarCarrito()
			}

		})

		carritoContador();
		guardarLocalStorage();

	})

	const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0) 
 	const totalCarrito = document.createElement("div")
	totalCarrito.classList.add("total-content")
	totalCarrito.innerHTML = `<p>Total a pagar: $${total}</p>`

	const botonDeleteCarrito = document.createElement("button")
	botonDeleteCarrito.classList.add("compra")
	botonDeleteCarrito.innerText = "Eliminar todo"
	modalContainer.appendChild(botonDeleteCarrito)

	botonDeleteCarrito.addEventListener("click", () =>
	{	
		alertEliminar()
		
	})

	const finalizarCompra = document.createElement("button")
	finalizarCompra.classList.add("compra")
	finalizarCompra.innerText = "Finalizar Compra"

	finalizarCompra.addEventListener("click", ()=> { 
		if(totalItemsEnCarrito() > 0) {location.href = "./form.html"}
		else {
			Swal.fire({
				position: 'top-end',
				icon: 'warning',
				title: 'Por favor ingrese prodcutos al carrito',
				showConfirmButton: false,
				timer: 900
			})
			cerrarCarrito()
		}
	})

	modalContainer.appendChild(totalCarrito)
	modalContainer.appendChild(finalizarCompra)
}

if(verCarrito)
{
	verCarrito.addEventListener("click", dibujarCarrito)
}

const carritoContador = () => 
{
	if(cantidadCarrito)
	{
		cantidadCarrito.style.display = "block"

		cantidadCarrito.innerText = totalItemsEnCarrito();
	}
}

const totalItemsEnCarrito = () =>
{
	let carritoCantidad = 0

	carrito.forEach(item => 
	{
		carritoCantidad += item.cantidad
	});

	return carritoCantidad;
}


function alertEliminar(id)
{
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	})

	swalWithBootstrapButtons.fire({
		title: 'Seguro?',
		text: "Esto no se puede revertir",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Si',
		cancelButtonText: 'No',
		reverseButtons: true
	}).then((result) =>
	{
		if (result.isConfirmed) 
		{
			
			swalWithBootstrapButtons.fire(
				'Eliminado',
				'Producto eliminado del carrito',
				'success'
			)
			vaciarCarrito()
			cerrarCarrito();
			carritoContador();
			carritoCero()

		} else if (
			result.dismiss === Swal.DismissReason.cancel
		)
		{
			swalWithBootstrapButtons.fire(
				'Cancelado',
				'Tu producto sigue en el carrito',
				'error'
			)
		}
	})
}

const carritoCero = ()=> {
	if (totalItemsEnCarrito() == 0)
			{
				cerrarCarrito();
			}
}

const vaciarCarrito =  ()=>{
	carrito = []
	localStorage.removeItem("carrito");
}