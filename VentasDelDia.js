const calcFechaDia = require("./calculaFechaDia.js");
const misClientes = require("./defClientes.js");
const productos = require("./defProductos.js");
//

/*
function calcFechaDia(diaop) {
    const fecha = new Date();
    let anio = fecha.getYear() + 1900;
    let bisiesto = false;
    if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
        bisiesto = true; 
    }
    let mes = fecha.getMonth() + 1; // (1 a 12) 
    let dia = fecha.getDate(); // (1 a 31)
    switch (mes) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            if ((dia+=diaop) > 31) { 
                dia = (dia%31);
                if (++mes >12) {
                    mes = 1;
                } 
            }
            break;
        case 4: case 6: case 9: case 11:
            if ((dia+= diaop) > 31) { 
                dia = (dia%30);
                    if (++mes >12) {
                    mes = 1;
                } 
            }
            break;
        default: // mes 2
        let ultDia = 28;
        if (bisiesto == true) {ultDia = 29; }
        if ((dia+= diaop) > ultDia) {
            dia = (dia%ultDia);
                if (++mes >12) {
                mes = 1;
            } 
        }
    }
    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString(); // 2 dígitos
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString(); // 2 dígitos
    // Combino día y mes en formato "ddmm"
    let ddmm = diaFormateado + mesFormateado;
    return (ddmm);
} */

class VentasDelDia {
    #diaOpera;          // Dia de operación Comercial (1, 2, 3...etc) 
    #ventaDia;         // producto[x], cantidad[y] a cliente[z] array tridimensional
    #fecha;             // fecha del día de ventas

    constructor (diaopera, venta) {
        this.#diaOpera     = diaopera;   // nro de orden (inicia en 1)
        this.#ventaDia     = [];    // array tridimensional
        this.#fecha        = calcFechaDia(diaopera-1); // fecha del día más nro de orden   
    }

    setDiaOpera(dia) {
        this.#diaOpera = dia;
    }

    getDiaOpera() {
        return (this.#diaOpera);
    }

    getFechaDia() {
        return (this.#fecha);
    }

    agregaVentaDia (prod, cant, client) {
        let ventaD = [prod.getNombreProducto(), cant, client.getNombreCliente()];
        this.#ventaDia.push(ventaD) ;   // pueden ser varias en el día
        // ahora actualiza stock y cliente
        prod.venderACliente (client, cant, this.#fecha);
    }
    
    getVentaDia() {
        console.log("Ventas día: "+this.#diaOpera+" Detalle: ");
        console.table(this.#ventaDia);
    }

}

module.exports = VentasDelDia;
