let saludos = [
    "Comprador", "Estimado Comprador", "" , "Querido Comprador"
]

function Saludar()
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

Saludar()