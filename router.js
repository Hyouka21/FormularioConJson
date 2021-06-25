const req = require("./request");
let route = (request, response, pathname) => {
    if (pathname == "/index" || pathname == "/") {
        req.inicio(response);
    } else if (pathname == "/mostrar") {
        req.mostrar(request, response);
    } else if (pathname == "/actualizar") {
        req.actualizarInfo(response);
    } else if (pathname == "/mostrarIns") {
        req.mostrarIns(request, response);
    } else if (pathname == "/insertar") {
        req.insertar(response);
    } else if (pathname == "/actuInfo") {
        req.actualizar(request, response);
    } else if (pathname == "/subir") {
        req.subir(request, response);
    } else if (pathname == "/borrar") {
        req.borrar(response);
    } else if (pathname == "/borrarInf") {
        req.borrarInf(request, response);
    } else {
        req.responderContenidoEstatico(request, response, pathname);
    }
}
exports.route = route;