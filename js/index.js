function delayDatos(momento) {
    const momentoActual = new Date()
    const momentoDatos = new Date(momento)
    const ano = momentoDatos.getFullYear()
    const mes = momentoDatos.getMonth();
    const dia = momentoDatos.getDate();
    const hora = momentoDatos.getHours()
    const minutos = momentoDatos.getMinutes()
    const segundos = momentoDatos.getSeconds();
    const momentoUTC = new Date(Date.UTC(ano, mes, dia, hora, minutos, segundos))
    const delaySegundos = (momentoActual.getTime() - momentoUTC.getTime()) / 1000
    return delaySegundos
}

function segundosPalabras(segundos){
    var tiempo
    const dias = Math.floor(segundos / 86400);
    const horas = Math.floor((segundos - (dias * 86400)) / 3600);
    const minutos = Math.floor((segundos - (dias * 86400) - (horas * 3600)) / 60);

    tiempo = (minutos > 0) ? `${minutos}min`: tiempo
    tiempo = (horas > 0) ? `${horas}horas. ` + tiempo : tiempo
    tiempo = (dias > 0) ? `${dias}dias. ` + tiempo : tiempo
    return tiempo
}

export {
   delayDatos, segundosPalabras, 
}