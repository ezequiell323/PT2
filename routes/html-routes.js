// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring covid API controller
const covidModel = require("../emergencyModels/covidModels");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // API added here
  app.get("/covid/:country", function (req, res) {

    covidModel.country(req.params.country, function (data) {
      let hbsObject = data;
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.get("/covid", function (req, res) {
    covidModel.all(function (data) {
      let hbsObject = { card: [{ cardName: "Confirmed",
                number: data.confirmed,
                lastUpdate: data.lastUpdate,
                text: "Number of total cases of COVID-19",
                color: "bg-info"}] };
                
      console.log(hbsObject);

      res.render("index", hbsObject);
    })
  })

};
