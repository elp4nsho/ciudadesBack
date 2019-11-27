var redis = require("./caching/redis");
var locations = require("./locations/locations");
var service = require("./services/service");
var moment = require('moment-timezone');
const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

setInterval(() => {
    io.emit('asd');
}, 10000);

locations = locations.locations;

locations.forEach(l => {
    redis.save(l.nombre, JSON.stringify(l.coordinates));
});



app.get('/', (req, res) => {
    service.obtenerTodo().then((d) => {
        res.send(d);
    })
})

app.get('/oli', (req, res) => {
    io.emit('asd');
    res.send("asd");
})

io.on("connection", s => {
    /*   s.on("message", mess => {
          console.log(mess);
      }) */

})
io.on("message", s => {
    console.log(s);

})

app.get('/name', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    var ciudad = req.query.ciudad;
    console.log(ciudad);
    service.obtenerPorNombre(ciudad).then((d) => {
        res.send(d);
    }).catch(e => {
        res.send(e);
    })

})

http.listen(3000);