const axios = require('axios');
var url = "https://api.darksky.net/forecast/fcc8af78e141450b762cd1c2c9992d33/";
/* var url = "https://api.darksky.net/forecast/0f4e2669f4157a32f7f9b6c439b42106/"; */
/* var url = "https://api.darksky.net/forecast/5464b2c35899af08f7cfcb31c04ed1e0/"; */

exports.obtenerTemperatura = (latitude, longitude) => {

    return new Promise((o, n) => {

        /* 
            if (Math.random(0, 1) < 0.1) {
              throw new Error('How unfortunate! The API Request Failed')
            } */

        axios.get(url + latitude + "," + longitude)
            .then(function(response) {
                o(Math.trunc((response.data.currently.temperature - 32) * (5 / 9)));
            })
            .catch(function(error) {
                n(error);
            })

    })

};