const divProducts = document.getElementById("tiendaContent")
const verCarrito = document.querySelector(".ver-carrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const fetchInfo = async () =>
{

	try
	{
		const res = await fetch("api.json")
		const data = await res.json()

		productosAlDom(data);

	} catch (error)
	{
		console.log(error);
	}
}


function productosAlDom(data)
{
	data.forEach(product =>
	{
		if (product.disponibilidad)
		{
			let content = document.createElement("div")
			content.classList.add("card")

			let imagenDom =  document.createElement("img");
            imagenDom.src = product.imagen;
            imagenDom.alt = product.nombre;

            let h2 = document.createElement("h2");
		    h2.textContent = product.nombre;

            let pDescripcion = document.createElement("p");
		    pDescripcion.textContent =product.descripcion;

            let pPrecio = document.createElement("p");
		    pPrecio.classList.add("price");
		    pPrecio.textContent = "$" + product.precio;			

			let button = document.createElement("button")
			button.textContent = "Comprar"
			button.classList.add("comprar")

			divProducts.append(content)
			content.appendChild(imagenDom)
            content.appendChild(h2)
            content.appendChild(pDescripcion)
            content.appendChild(pPrecio) 
			content.appendChild(button)

			button.addEventListener("click", (e) =>
			{
				e.preventDefault()

				const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)

				if (repeat)
				{
					carrito.map((prod) =>
					{
						if (prod.id === product.id)
						{
							prod.cantidad++
						}
					})
				}
				else
				{
					carrito.push({
						id: product.id,
						imagen: product.imagen,
						nombre: product.nombre,
						precio: product.precio,
						cantidad: product.cantidad,
					})
					Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Producto agregado al carrito',
                        showConfirmButton: false,
                        timer: 700
                      })
				}

				carritoContador()
				guardarLocalStorage()

			})

		}
	});
}

const guardarLocalStorage = () => { localStorage.setItem("carrito", JSON.stringify(carrito)) }

