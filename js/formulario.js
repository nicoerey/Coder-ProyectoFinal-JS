const nombreForm = document.getElementById("nombre-form")
const apellidoForm = document.getElementById("apellido-form")
const direccionForm = document.getElementById("direccion-form")
const telForm = document.getElementById("telefono-form")
const emailForm = document.getElementById("email-form")
const numTarjetaForm = document.getElementById("numero-tarjeta-form")
const mesTarjetaForm = document.getElementById("mes-tarjeta")
const codSegForm = document.getElementById("cod-seg-form")

const confirmarForm = document.getElementById("confirmar-form")


const form = document.getElementById("form")

if(!carrito || carrito.length == 0)
{
    location.href = "./index.html"
}

const eventosValidacion = () =>
{
    form.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        if(validacionGeneral())
        {           
            return false;
        }
        else
        {
            Swal.fire({
                title: 'Gracias por comprar con nosotros',
                confirmButtonText: 'Volver al inicio'
            })
            .then(() => 
            {                
                vaciarCarrito();
                location.href = "index.html";
            })
            
            return false;
        }
    })
}

const armarResumenCarrito = () =>
{
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const divCarritoForm = document.getElementById("div-carrito-form")
    let resumenCarrito = document.createElement("p")
    resumenCarrito.innerHTML = 
    ` <p>Usted esta comprando ${totalItemsEnCarrito()} productos </p>
      <p>Total a pagar: $${total} </p> `   
    divCarritoForm.appendChild(resumenCarrito) 
    
}

const validacionGeneral = ()=>
{
    let hayError = false;

    /* nombre */

    if(nombreForm.value.length == 0)
    {
        nombreForm.classList.add("error");
        hayError = true;
    }
    else
    {
        nombreForm.classList.remove("error");
    }

    /* apellido */

    if(apellidoForm.value.length == 0)
    {
        apellidoForm.classList.add("error");
        hayError = true;
    }
    else
    {
        apellidoForm.classList.remove("error");
    }    

    /* direccion */

    if(direccionForm.value.length == 0)
    {
        direccionForm.classList.add("error");
        hayError = true;
    }
    else
    {
        direccionForm.classList.remove("error");
    }

    /* email */

    if(!validateEmail(emailForm.value))
    {
        emailForm.classList.add("error");
        hayError = true;
    }
    else
    {
        emailForm.classList.remove("error");
    }    

    /* telefono */

    var isInValidphone = !tieneSoloNumeros(telForm.value);

    if(isInValidphone || telForm.value.length != 11)
    {
        telForm.classList.add("error");
        hayError = true;
    }
    else
    {
        telForm.classList.remove("error");
    }

    /* tarjeta */

    var isInValidCard = !tieneSoloNumeros(numTarjetaForm.value);

    if(isInValidCard || numTarjetaForm.value.length != 16)
    {
        numTarjetaForm.classList.add("error");
        hayError = true;
    }
    else
    {
        numTarjetaForm.classList.remove("error");
    }

    /* mes tarjeta */

    if(mesTarjetaForm.value.length == 0)
    {
        mesTarjetaForm.classList.add("error");
        hayError = true;
    }
    else
    {
        mesTarjetaForm.classList.remove("error");
    }    

    /* cod seg tarjeta */

    var isInValidCode = !tieneSoloNumeros(codSegForm.value);

    if(isInValidCode || codSegForm.value.length != 4)
    {
        codSegForm.classList.add("error");
        hayError = true;
    }
    else
    {
        codSegForm.classList.remove("error");
    }
    
    return hayError;
}

const tieneSoloNumeros = (texto) =>
{
    var noTieneSoloNumeros = texto.split('').filter
    ( 
        function(v)
        { 
            return isNaN(v) 
        } 
    ).length > 0;

    return !noTieneSoloNumeros;
}

const validateEmail = (email) => 
{
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

armarResumenCarrito();
eventosValidacion();
