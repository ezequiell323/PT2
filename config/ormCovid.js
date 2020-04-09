// Covid API connection
const axios = require('axios');
let covidConn = "https://covid19.mathdro.id/api";

// Object for all our SQL statement functions.
var orm = {
  all: function(cb) {
    axios.get(covidConn).then((res) => {

      cb({
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value,
        lastUpdate: res.data.lastUpdate
      });
    });
  },
  country: function(country, cb) {
    axios.get(covidConn+"/countries/"+country).then((res) => {
      cb({
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value,
        lastUpdate: res.data.lastUpdate
      });
    });
  },
  // countries: function(cb) {
  //   axios.get(covidConn).then((res) => {

  //   cb(res);
  //   });
  // }
};


// Export the orm object for the model (cat.js).
module.exports = orm;