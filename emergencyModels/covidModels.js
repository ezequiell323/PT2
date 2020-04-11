// Import the ORM to create functions that will interact with the database.
var orm = require("../config/ormCovid.js");

var covid = {
  all: function(cb) {
    orm.all( function(res) {
      cb(res);
    });
  },
  country: function(country, cb) {
    orm.country(country, cb);
  }
};

// Export the database functions for the controller (burgersController.js).
module.exports = covid;
