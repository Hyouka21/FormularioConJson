const url = require("url");
const http = require("http");
const rut = require("./router");

//inicializa el servidor
function iniciar() {
    function onRequest(request, response) {
        //obtiene el pathname del requerimiento actual
        let pathname = url.parse(request.url).pathname;
        console.log("Request para ruta " + pathname + " recibido.");
        //pasa handle, req y res al router (pathname podría obtenerse desde req.)
        rut.route(request, response, pathname);
    }
    //crea el servidor web http y pone a escuchar peticiones
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciado");
}
exports.iniciar = iniciar;