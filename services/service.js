const axios = require('axios');
var url = "https://api.darksky.net/forecast/fcc8af78e141450b762cd1c2c9992d33/"
var locations = require("../locations/locations");
locations = locations.locations;
var redis = require("../caching/redis");
var hour = require("../api/hour");
var temperature = require("../api/temperature");
var moment = require("moment-timezone");
var lista = [];

exports.obtenerPorNombre = (nombre) => {
    var res = {};
    res.nombre = nombre;
    var loc = "";
    return new Promise((o, n) => {
        /* if (Math.random(0, 1) < 0.1) {
          throw new Error('How unfortunate! The API Request Failed')
        } */
        redis.get(nombre).then(reply => {
            if (reply != null) {
                reply = JSON.parse(reply);

                hour.obtenerHora(reply.latitude, reply.longitude)
                    .then(h => {
                        loc = locacionPorNombre(nombre);
                        loc = loc[0];
                        res.hora = moment.unix(h).tz(`${loc.continente}/${loc.nombre}`).format("h:m:s a");
                        temperature.obtenerTemperatura(reply.latitude, reply.longitude)
                            .then(t => {
                                res.temperatura = t;
                                o(res);
                            })
                    });
            } else {
                n("No se encontro " + nombre);
            }
        })
    });
}
exports.obtenerTodo = () => {
    lista = [];
    return new Promise((o, n) => {

        /* if (Math.random(0, 1) < 0.1) {
          throw new Error('How unfortunate! The API Request Failed')
        } */

        locations.forEach((l, index, arr) => {
            this.obtenerPorNombre(l.nombre).then(d => {
                lista.push(d);
                if (index == arr.length - 1) {
                    o(lista);
                }

            })
        });

        /* for(i=0;i<locations.length;i++){
          this.obtenerPorNombre(locations[i].nombre).then(d=>{
            lista.push(d);
            if(i==locations.length-1){
              o(lista);
            }
          })
        } */

    });
}

function locacionPorNombre(nombre) {
    return locations.filter(l => {
        return l.nombre == nombre;
    })
}