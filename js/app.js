function primeraCargaHTML()
{
	document.addEventListener("DOMContentLoaded", () =>
	{
		fetchInfo()
		carritoContador()
		Swal.fire({
			title: "Bienvenido a Tienda Fake " + saludos[Math.floor(Math.random() * saludos.length)]
		})
	})
}


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
			let button = document.createElement("button")

			content.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p class="price">${"$" + product.precio}</p>
            `
			content.classList.add("card")
			divProducts.append(content)

			
			button.textContent = "Comprar"
			button.classList.add("comprar")
			content.append(button)

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
				}

				carritoContador()
				guardarLocalStorage()

			})

		}
	});
}

const guardarLocalStorage = () => { localStorage.setItem("carrito", JSON.stringify(carrito)) }

primeraCargaHTML()