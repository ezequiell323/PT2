// Covid API connection
const axios = require('axios');
let covidConn = "https://covid19.mathdro.id/api";

// Object for all our SQL statement functions.
let orm = {
  all: function(cb) {
    Promise.all([axios.get(covidConn),axios.get(covidConn + "/daily")])
    
    .then((res) => {
      cb({
        confirmed: res[1].data[res[1].data.length-1].confirmed.total,
        recovered: res[0].data.recovered.value,
        deaths: res[1].data[res[1].data.length-1].deaths.total,
        lastUpdate: res[1].data[res[1].data.length-1].reportDate
      });
    });
  },
  country: function(country, cb) {
    axios.get(covidConn+"/countries/"+country).then((res) => {
      cb({
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value,
        lastUpdate: res.data.lastUpdate,
        country: country
      });
    });
  }
};


// Export the orm object for the model (cat.js).
module.exports = orm;