let cliente = ''
let codigoProducto = 0
let producto = {}
let productosComprados = []
let detalleProductos = ''
let cantidad = 0
let subTotal = 0
let seguirComprando = true
let formaPago = ''
let formaEnvio = ''
let costoEnvio = 0
const descuento = 0.1
let importeDescuento = 0
let direccion = ''

const inicio = () =>{
    cliente = prompt('Bienvenido a la tienda on-line del Rey de la Limpieza, por favor ingrese su nombre:')
    subTotal = 0
    if(cliente===null || cliente===''){
       alert('El nombre ingresado no es valido.')
       inicio()
    }else{
        productosComprados = []
        detalleProductos = ''
        comprar()
        envio()
        pagar()
        alert(`Muchas gracias por su compra! 
        Se adjunta un detalle de la misma:
        - Cliente: ${cliente}
        - Productos: ${detalleProductos}
        - Forma de envío: ${formaEnvio}
        - Dirección de envío: ${direccion}
        - Costo por envío: $${costoEnvio}
        - Forma de pago: ${formaPago}
        - Descuento por pago de contado: -$${importeDescuento}
        - Total a Pagar: $${subTotal}`)
    }
}

const ingresarProducto = () =>{
    codigoProducto = parseInt(prompt('Ingrese el código del producto que desea agregar al carrito de compra.'))
    if(codigoProducto === null || codigoProducto<=0 || isNaN(codigoProducto)){
        alert('El código ingresado no es valido.')
        ingresarProducto()
    }
    return codigoProducto
}

const buscarProducto = () =>{
    switch (codigoProducto) {
        case 1:
            producto.nombre = 'Jabón líquido para ropa x 1L'
            producto.precio = 1000
            break;
        case 2:
            producto.nombre = 'Suavizante para ropa x 1L'
            producto.precio = 900
            break;
        case 3:
            producto.nombre = 'Quitamanchas para ropa x uni'
            producto.precio = 500
            break;
        case 4:
            producto.nombre = 'Detergente x 1L'
            producto.precio = 450
            break;
        case 5:
            producto.nombre = 'Desinfectante para pisos x 1L'
            producto.precio = 700
            break;
        case 6:
            producto.nombre = 'Lavandina x 1L'
            producto.precio = 400
            break;
        case 7:
            producto.nombre = 'Desengrasante x 1L'
            producto.precio = 750
            break;
        case 8:
            producto.nombre = 'Esponja de cocina x uni'
            producto.precio = 150
            break;
        case 9:
            producto.nombre = 'Mopa para pisos x uni'
            producto.precio = 400
            break;
        case 10:
            producto.nombre = 'Trapo de pisos x uni'
            producto.precio = 300
            break;
        case 11:
            producto.nombre = 'Rejilla x uni'
            producto.precio = 200
            break;
        case 12:
            producto.nombre = 'Limpia vidrios x 1L'
            producto.precio = 450
            break;
        case 13:
            producto.nombre = 'Desinfectante para baños x 1L'
            producto.precio = 600
            break;
        case 14:
            producto.nombre = 'Escoba x uni'
            producto.precio = 500
            break;
        case 15:
            producto.nombre = 'Secador de pisos'
            producto.precio = 500
            break;
        default:
            alert('El código ingresado no corresponde a un producto válido, por favor repita nuevamente la operación.')
            producto.nombre = ''
            producto.precio = 0
            ingresarProducto()
            break;
    }
    return producto
}

const ingresarCantidad = () =>{
    cantidad = parseInt(prompt('Ingrese la cantidad de ' + producto.nombre + ' que desea agregar al carrito de compra'))
    if(cantidad === null || cantidad<=0 || isNaN(cantidad)){
        alert('El código ingresado no es valido.')
        ingresarCantidad()
    }
    return cantidad
}

const comprar = () =>{
    do{
        ingresarProducto()
        buscarProducto()
        ingresarCantidad()

        subTotal += producto.precio * cantidad

        detalleProductos += `\n            * ${cantidad} x ${producto.nombre} = $${producto.precio * cantidad}`

        seguirComprando = confirm('El importe total del carrito de compra es de $'+ subTotal +'. Desea agregar otro producto?')

    }while(seguirComprando)
}

const envio = () =>{
    formaEnvio = prompt('El envío a domicilio tiene un costo de $500. Ingrese "SI" para enviar a domicilio o ingrese "NO" para retirar el pedido.').toUpperCase()
    if(formaEnvio==="SI"){
        direccion = prompt('Ingrese la dirección para que le enviemos el pedido.')
        costoEnvio = 500
        subTotal += costoEnvio
        formaEnvio = 'ENVÍO A DOMICILIO'
    }else if(formaEnvio==="NO"){
        alert('Usted eligió retiro por local.')
        formaEnvio = 'RETIRO POR EL LOCAL.'
        direccion = ''
        costoEnvio = 0
    }else{
        alert('El valor ingresado no es correcto.')
        envio()
    }
}

const pagar = () =>{
    formaPago = prompt('Si realiza el pago de contado se realizará un descuento del 10% sobre el total de la compra. Elija la forma de pago. ¿Efectivo o Tarjeta?').toUpperCase()
    if (formaPago==="EFECTIVO"){
        importeDescuento = subTotal*descuento
        subTotal = subTotal - importeDescuento
        alert('Se aplico un descuento del 10%. El total a pagar es $'+subTotal)
    }else if(formaPago==="TARJETA"){
        alert('El pago se realizará con tarjeta. El total a pagar es $'+subTotal)
    }else{
        alert('El valor ingresado no es correcto.')
        pagar()
    }
}