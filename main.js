let cliente = ''
let codigoProducto = 0
let producto = {}
let carrito = []
let totalCarrito = 0
let detalleProductos = []
let cantidad = 0
let seguirComprando = false
let formaPago = ''
let formaEnvio = ''
let costoEnvio = 500
const descuento = 0.1
let importeDescuento = 0
let direccion = ''
let existeProducto = false

//Capturar Boton
const btnRealizarCompra = document.querySelector('#realizarCompra')
btnRealizarCompra.onclick = () => {
    inicio()
}

const inicio = () =>{
    do{
        cliente = prompt('Bienvenido a la tienda on-line del Rey de la Limpieza.\nPor favor ingrese su nombre:')
        if(cliente===null || cliente===''){
            alert('El nombre ingresado no es valido.')
        }
    }while(cliente===null || cliente==='')
    comprar()
}

const comprar = () =>{
    do{
        do{
            codigoProducto = parseInt(prompt('Ingrese el código del producto que desea agregar al carrito de compra.'))
            existeProducto = productos.some(productos => productos.id == codigoProducto)
            if(!existeProducto){
                alert('El código ingresado no es valido.')
            }
        }while(!existeProducto)

        producto = productos.find(producto => producto.id == codigoProducto)
    
        do{
            cantidad = parseInt(prompt('Ingrese la cantidad de *' + producto.nombre + '* que desea agregar al carrito de compra'))        
            if(cantidad === null || cantidad<=0 || isNaN(cantidad)){
                alert('La cantidad ingresada no es valida.')
            }else{
                agregarCarrito(producto, producto.id, cantidad)
            }
        }while(cantidad === null || cantidad<=0 || isNaN(cantidad))
        
        totalCarrito = carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0)
        seguirComprando = confirm(`El importe acumulado en el carrito es de $${totalCarrito}\n¿Desea agregar otro producto?`)

    }while(seguirComprando)
    confirmacion()
}

const agregarCarrito = (producto, id, cantidad) =>{
    const productoRepetido = carrito.find(productoRe => productoRe.id == id)
    if (!productoRepetido) {
        producto.cantidad = cantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += cantidad
    }
}

const confirmacion =() =>{
    carrito.forEach((producto) =>{
        detalleProductos += `\n - Producto: ${producto.nombre} | Cantidad: ${producto.cantidad} = $${producto.precio * producto.cantidad}`
    })
    const confirmar = confirm(`Detalle del carrito: 
        ${detalleProductos}
        \nImporte total del carrito: $${totalCarrito}
        \nPresione "Aceptar" para confirmar o "Cancelar" para anular la compra.`
    )
    if(confirmar){
        subTotal = totalCarrito
        envio()
    }else{
        alert("La compra fue cancelada.\nQue tenga un buen día.")
        carrito = []
    }
}

const envio = () =>{
    formaEnvio = confirm('El envío a domicilio tiene un costo de $500.\nIngrese "Aceptar" para enviar a domicilio o ingrese "Cancelar" para retirar el pedido.')
    if(formaEnvio){
        do{
            direccion = prompt('Usted eligió envió a domicilio.\nIngrese la dirección para que le enviemos el pedido.')
        }while(direccion === null || direccion === '')
        costoEnvio = 500
        subTotal += costoEnvio
        formaEnvio = 'ENVÍO A DOMICILIO'
    }else{
        alert('Usted eligió retiro por local.')
        formaEnvio = 'RETIRO POR EL LOCAL'
        direccion = ''
        costoEnvio = 0
    }
    pagar()
}

const pagar = () =>{
    formaPago = confirm('Si realiza el pago de contado tendrá un descuento del 10% sobre el total de la compra. \nElija la forma de pago:\n"Aceptar" para pago de Contado\n"Cancelar" para pago con Tarjeta')
    if (formaPago){
        importeDescuento = subTotal*descuento
        subTotal = subTotal - importeDescuento
        formaPago = "Efectivo"
        alert('Se aplico un descuento del 10%.\nEl total a pagar es $'+subTotal)
    }else{
        formaPago = "Tarjeta"
        alert('El pago se realizará con tarjeta.\nEl total a pagar es $'+subTotal)
    }
    mostrarDetalleCompra()
}

const mostrarDetalleCompra = () => {
    alert(`Muchas gracias por su compra! 
    Se adjunta un detalle de la misma:\n
Cliente: ${cliente}
${detalleProductos}\n
Forma de envío: ${formaEnvio}
Dirección de envío: ${direccion}
Costo por envío: $${costoEnvio}
Forma de pago: ${formaPago}
Descuento: -$${importeDescuento}
Total a Pagar: $${subTotal}`)
}