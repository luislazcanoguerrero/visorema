import { delayDatos, segundosPalabras } from './index.js'

var codigoEstacion = '330020';

document.getElementById('btnSwitch').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
})

export async function getDatos() {
    try {
        const url = `https://climatologia.meteochile.gob.cl/application/servicios/getEmaResumenDiario/${codigoEstacion}/?usuario=luislazcano10@gmail.com&token=TcyMjAwODAzODk0OQ==YHcRjB`;
        console.log
        const res = await fetch(url);
        const data = await res.json();
        actualizaDatos(data);
        setTimeout(getDatos, 300000)
    } catch (error) {
        console.log(error)
        alert('No pude conectarme a la API');
        setTimeout(getDatos, 300000)
    }
}

function actualizaHora() {
    const fechaActual = moment()
    const idMomentoActual = document.getElementById('idMomentoActual');
    const fechaFormateada2 = fechaActual.format('DD-MM-YYYY, h:mm:ss a');
    idMomentoActual.innerHTML = fechaFormateada2
    setTimeout(actualizaHora, 1000)
}


function actualizaDatos(datosActuales) {

    console.log(datosActuales)
    const momentoActual = new Date()
    const ts = document.getElementById('ts');
    const hr = document.getElementById('hr');
    const td = document.getElementById('td');
    const pl = document.getElementById('pl');
    const aguaHoy = document.getElementById('aguaHoy');
    const aguaAyer = document.getElementById('aguaAyer');
    const nombreId = document.getElementById('nombreEstacion');
    const idMomentoActual = document.getElementById('idMomentoActual');

    const idTsMinimaHoy = document.getElementById('idTsMinimaHoy');
    const idTsMaximaHoy = document.getElementById('idTsMaximaHoy');
    const idTsMinimaAyer = document.getElementById('idTsMinimaAyer');
    const idTsMaximaAyer = document.getElementById('idTsMaximaAyer');

    const fechaActual = moment()
    const fechaAyer = fechaActual.clone().subtract(1, 'days').format('DD-MM-YYYY');

    const dia = `${momentoActual.getDate()}`
    const mes = `${momentoActual.getMonth() + 1}`
    const anoMesDia = `${dia.padStart(2, '0')}-${mes.padStart(2, '0')}-${momentoActual.getFullYear()}`;

    const { nombreEstacion, codigoNacional } = datosActuales.datosEstacion
    const { momento, temperatura, puntoDeRocio, humedadRelativa, presionEstacion } = datosActuales.datos.valoresMasRecientes;

    // Temperaturas Extremas del día de Hoy
    if (datosActuales.datos.temperaturaExtremas[anoMesDia]) {
        const tMaximaHoy = datosActuales.datos.temperaturaExtremas[anoMesDia].maxima.valor;
        const tMinimaHoy = datosActuales.datos.temperaturaExtremas[anoMesDia].minima.valor;
        const hMaximaHoy = datosActuales.datos.temperaturaExtremas[anoMesDia].maxima.momento;
        const hMinimaHoy = datosActuales.datos.temperaturaExtremas[anoMesDia].minima.momento;

        idTsMaximaHoy.innerHTML = Number(tMaximaHoy).toFixed(1) + ' °'
        idTsMinimaHoy.innerHTML = Number(tMinimaHoy).toFixed(1) + ' °'
        idTsMaximaHoy.title = hMaximaHoy
        idTsMinimaHoy.title = hMinimaHoy
    } else {
        idTsMaximaHoy.innerHTML = '.'
        idTsMaximaAyer.innerHTML = '.'
    }

    // Temperaturas extremas del día de Ayer
    if (datosActuales.datos.temperaturaExtremas[fechaAyer]) {
        const tMaximaAyer = datosActuales.datos.temperaturaExtremas[fechaAyer].maxima.valor;
        const tMinimaAyer = datosActuales.datos.temperaturaExtremas[fechaAyer].minima.valor;
        const hMaximaAyer = datosActuales.datos.temperaturaExtremas[fechaAyer].maxima.momento;
        const hMinimaAyer = datosActuales.datos.temperaturaExtremas[fechaAyer].minima.momento;

        idTsMinimaAyer.innerHTML = Number(tMinimaAyer).toFixed(1) + ' °'
        idTsMaximaAyer.innerHTML = Number(tMaximaAyer).toFixed(1) + ' °'
        idTsMaximaAyer.title = hMaximaAyer
        idTsMinimaAyer.title = hMinimaAyer

    } else {
        idTsMinimaAyer.innerHTML = '.'
        idTsMaximaAyer.innerHTML = '.'
    }

    // Mostrando Agua Caída de Hoy y Ayer
    if (datosActuales.datos.aguaCaidaDiaria[anoMesDia]) {
        const aguaHoyValor = datosActuales.datos.aguaCaidaDiaria[anoMesDia].valor;
        aguaHoy.innerHTML = Number(aguaHoyValor).toFixed(1) + ' mm';
    } else {
        aguaHoy.innerHTML = '.';
    }
    if (datosActuales.datos.aguaCaidaDiaria[fechaAyer]) {
        const aguaAyerValor = datosActuales.datos.aguaCaidaDiaria[fechaAyer].valor;
        aguaAyer.innerHTML = Number(aguaAyerValor).toFixed(1) + ' mm';
    } else {
        aguaAyer.innerHTML = '.';
    }

    nombreId.innerHTML = `${nombreEstacion} <small> (${codigoNacional}) </small>`
    ts.innerHTML = Number(temperatura).toFixed(1) + '°';
    hr.innerHTML = Number(humedadRelativa).toFixed(0) + ' %'
    td.innerHTML = Number(puntoDeRocio).toFixed(1) + ' °'
    pl.innerHTML = Number(presionEstacion).toFixed(1) + ' hPa'



    const statusId = document.getElementById('statusId');
    const delayMediciones = segundosPalabras(delayDatos(momento))
    statusId.innerHTML = `Datos de ${delayMediciones} atrás`
    statusId.title = momento

    const fechaFormateada2 = fechaActual.format('MMMM Do YYYY, h:mm:ss a');
    idMomentoActual.innerHTML = fechaFormateada2
}


window.$_GET = new URLSearchParams(location.search);
var codigoEstacion = $_GET.get('codigo');

if(!codigoEstacion){
    codigoEstacion = '330020'
}

getDatos()
actualizaHora()

