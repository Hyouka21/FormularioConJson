//cada función atiende a un end-point
const fs = require("fs");
const querystring = require("querystring");
const pug = require("pug");
const path = require("path");
const fetch = require("node-fetch");
const request = require('request');
const _ = require('lodash');
const tiposMime = {
    ".html": "text/html",
    ".jpg": "image/jpg",
    ".png": "image/png",
    ".json": "application/json",
    ".css": "text/css",
    ".js": "application/javascript"
};
let cabecerasHttp = { "Content-Type": "text/html" };

function responderContenidoEstatico(req, res, pat) {
    const pathEstatico = "static" + pat;
    fs.stat(pathEstatico, (error) => {
        //encontro el archivo
        console.log(pathEstatico);
        if (!error) {
            fs.readFile(pathEstatico, (error, datos) => {
                //no se pudo leer el archivo
                if (error) {
                    res.writeHead(500, cabecerasHttp);
                    res.end();
                }
                //termino de leer el archivo
                else {
                    const extension = path.extname(pathEstatico);
                    const tipoContenido = tiposMime[extension];

                    res.writeHead(200, "Content-Type:" + tipoContenido);
                    res.write(datos);
                    res.end();
                }
            });
        }
        //no encontro el archivo
        else {
            let con = pug.renderFile("vistas/Error.pug", {
                pretty: true,
                error: true

            });
            res.writeHead(400, { "Content-Type": "text/html" });
            res.write(con);
            res.end();
        }
    });
}

function inicio(response) {
    let body = pug.renderFile("vistas/inicio.pug", { pretty: true });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();

}
//retorna pagina con el formulario
function actualizar(req, response) {
    let info = "";
    req.on("data", (datosparciales) => {
        info += datosparciales;
    });
    req.on("end", () => {
        const formulario = querystring.parse(info);
        fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
            if (error) {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                respuesta.write('Error interno');
                respuesta.end();
            } else {

                let objetoJson = JSON.parse(contenido);;


                let n = _.findIndex(objetoJson, function(o) {

                    return o.Patente == formulario["patente"];
                });
                if (n != (-1)) {
                    let body = pug.renderFile("vistas/actualizar.pug", {
                        pretty: true,
                        patente: objetoJson[n]["Patente"],
                        color: objetoJson[n]["Color"],
                        nombre: objetoJson[n]["Dueño"],
                        marcaA: objetoJson[n]["Marca"],
                        modelo: objetoJson[n]["Modelo"],
                    });
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(body);
                    response.end();
                } else {
                    let con = pug.renderFile("vistas/error.pug", {
                        pretty: true,

                    });
                    response.writeHead(500, { "Content-Type": "text/html" });
                    response.write(con);
                    response.end();

                }
            }
        });
    });

}

function actualizarInfo(response) {
    let body = pug.renderFile("vistas/inicio.pug", { pretty: true, actualizar: true });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function borrar(response) {
    let body = pug.renderFile("vistas/inicio.pug", { pretty: true, borrar: true });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function borrarInf(req, response) {
    let info = "";
    req.on("data", (datosparciales) => {
        info += datosparciales;
    });
    req.on("end", () => {
        const formulario = querystring.parse(info);
        fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
            if (error) {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                respuesta.write('Error interno');
                respuesta.end();
            } else {

                let objetoJson = JSON.parse(contenido);


                let n = _.findIndex(objetoJson, function(o) {

                    return o.Patente == formulario["patente"];
                });
                if (n != (-1)) {
                    let body = pug.renderFile("vistas/mostrar.pug", {
                        pretty: true,
                        patente: objetoJson[n]["Patente"],
                        color: objetoJson[n]["Color"],
                        nombre: objetoJson[n]["Dueño"],
                        marca: objetoJson[n]["Marca"],
                        modelo: objetoJson[n]["Modelo"],
                    });
                    console.log(objetoJson[n]["Patente"])
                    borrarauto(objetoJson, n);

                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(body);
                    response.end();
                } else {
                    let con = pug.renderFile("vistas/error.pug", {
                        pretty: true,

                    });
                    response.writeHead(500, { "Content-Type": "text/html" });
                    response.write(con);
                    response.end();
                }
            }
        });
    });
}


function insertar(response) {
    let body = pug.renderFile("vistas/insertar.pug", { pretty: true });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function mostrar(req, response) {
    let info = "";
    req.on("data", (datosparciales) => {
        info += datosparciales;
    });
    req.on("end", () => {
        const formulario = querystring.parse(info);
        fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
            if (error) {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                respuesta.write('Error interno');
                respuesta.end();
            } else {

                let objetoJson = JSON.parse(contenido);;


                let n = _.findIndex(objetoJson, function(o) {

                    return o.Patente == formulario["patente"];

                });
                if (n != (-1)) {
                    let body = pug.renderFile("vistas/mostrar.pug", {
                        pretty: true,
                        patente: objetoJson[n]["Patente"],
                        color: objetoJson[n]["Color"],
                        nombre: objetoJson[n]["Dueño"],
                        marca: objetoJson[n]["Marca"],
                        modelo: objetoJson[n]["Modelo"],
                    });
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(body);
                    response.end();
                } else {
                    let con = pug.renderFile("vistas/error.pug", {
                        pretty: true,

                    });
                    response.writeHead(500, { "Content-Type": "text/html" });
                    response.write(con);
                    response.end();
                }
            }
        });
    });
}

//procesa el archivo enviado por el formulario
function mostrarIns(req, res) {
    let colorcito;
    let info = "";

    req.on("data", (datosparciales) => {
        info += datosparciales;
    });
    req.on("end", () => {
        const formulario = querystring.parse(info);

        res.writeHead(200, { "Content-Type": "text/html" });

        let hexa = formulario["color"].split("#");
        //console.log(hexa[1]);
        fetch(`http://www.thecolorapi.com/id?hex=${hexa[1]}`)
            .then(response => response.json())
            .then(data => {
                colorcito = data.name.value;
                let colortra;
                /* const options = {
                     method: 'POST',
                     url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
                     headers: {
                         'content-type': 'application/x-www-form-urlencoded',
                         'accept-encoding': 'application/gzip',
                         'x-rapidapi-key': 'edce0bedc0msh877fd14d4d69eb4p16e9b7jsn0322d1212e8d',
                         'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                         useQueryString: true
                     },
                     form: { q: colorcito, source: 'en', target: 'es' }
                 };

                 request(options, function(error, response, body) {
                     if (error) throw new Error(error);
                console.log(body);                                           Se me acabaron la pruebas pero funcionaba
                let resp = JSON.parse(body);
                colortra = resp.data.translations[0].translatedText;*/
                colortra = colorcito;
                const pagina = pug.renderFile("vistas/mostrar.pug", {
                    pretty: true,
                    patente: formulario["patente"],
                    color: colortra,
                    nombre: formulario["dueño"],
                    marca: formulario["marcas"],
                    modelo: formulario["modelos"],
                });
                guardar(formulario);
                res.end(pagina);
            });
    });
    //});

}
let subir = (req, res) => {
    let colorcito;
    let info = "";

    req.on("data", (datosparciales) => {
        info += datosparciales;
    });
    req.on("end", () => {
        const formulario = querystring.parse(info);

        res.writeHead(200, { "Content-Type": "text/html" });

        let hexa = formulario["color"].split("#");
        //console.log(hexa[1]);
        fetch(`http://www.thecolorapi.com/id?hex=${hexa[1]}`)
            .then(response => response.json())
            .then(data => {
                colorcito = data.name.value;
                let colortra;
                /* const options = {
                     method: 'POST',
                     url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
                     headers: {
                         'content-type': 'application/x-www-form-urlencoded',
                         'accept-encoding': 'application/gzip',
                         'x-rapidapi-key': 'edce0bedc0msh877fd14d4d69eb4p16e9b7jsn0322d1212e8d',
                         'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                         useQueryString: true
                     },
                     form: { q: colorcito, source: 'en', target: 'es' }
                 };

                 request(options, function(error, response, body) {
                     if (error) throw new Error(error);
                console.log(body);                                           Se me acabaron la pruebas pero funcionaba
                let resp = JSON.parse(body);
                colortra = resp.data.translations[0].translatedText;*/
                colortra = colorcito;
                const pagina = pug.renderFile("vistas/mostrar.pug", {
                    pretty: true,
                    patente: formulario["patente"],
                    color: colortra,
                    nombre: formulario["dueño"],
                    marca: formulario["marcas"],
                    modelo: formulario["modelos"],
                });
                guardarAct(formulario);
                res.end(pagina);
            });
    });
    //});



}
let guardar = (form) => {
    let objetoJson;
    fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
            respuesta.write('Error interno');
            respuesta.end();
        } else {

            objetoJson = JSON.parse(contenido);;

            let Auto = { "Patente": form["patente"], "Dueño": form["dueño"], "Color": form["color"], "Marca": form["marcas"], "Modelo": form["modelos"] };
            objetoJson.push(Auto);
            fs.writeFile('./static/datos.json', JSON.stringify(objetoJson), function(err) {
                if (err) { throw err; } else {
                    console.log("datos guardados");
                }
            });
        }
    });
}
let guardarAct = (form) => {
    let objetoJson;
    fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
            respuesta.write('Error interno');
            respuesta.end();
        } else {

            objetoJson = JSON.parse(contenido);;
            let Auto = { "Patente": form["patente"], "Dueño": form["dueño"], "Color": form["color"], "Marca": form["marcas"], "Modelo": form["modelos"] };


            _.remove(objetoJson, function(x) {

                return x.Patente == Auto.Patente;
            });
            objetoJson.push(Auto);
            fs.writeFile('./static/datos.json', JSON.stringify(objetoJson), function(err) {
                if (err) { throw err; } else {
                    console.log("datos actualizados");
                }
            });
        }
    });
}
let borrarauto = (form, x) => {
    let objetoJson;
    fs.readFile("./static/datos.json", "utf8", (error, contenido) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
            respuesta.write('Error interno');
            respuesta.end();
        } else {

            objetoJson = JSON.parse(contenido);;
            let Auto = { "Patente": form[x]["Patente"], "Dueño": form[x]["Dueño"], "Color": form[x]["Color"], "Marca": form[x]["Marca"], "Modelo": form[x]["Modelo"] };

            console.log(Auto.Patente);
            _.remove(objetoJson, function(x) {
                return x.Patente == Auto.Patente;
            });
            fs.writeFile('./static/datos.json', JSON.stringify(objetoJson), function(err) {
                if (err) { throw err; } else {
                    console.log("datos borrados");
                }
            });
        }
    });
}
exports.mostrarIns = mostrarIns;
exports.mostrar = mostrar;
exports.actualizar = actualizar;
exports.insertar = insertar;
exports.inicio = inicio;
exports.actualizarInfo = actualizarInfo;
exports.subir = subir;
exports.borrar = borrar;
exports.borrarInf = borrarInf;
exports.responderContenidoEstatico = responderContenidoEstatico;