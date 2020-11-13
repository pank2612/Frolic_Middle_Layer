module.exports = app => {
    const sports = require("../controllers/sports.controller.js");
    const tournaments = require("../controllers/tournaments.controller.js");
  
    // Create a new sports
    app.post("/sports", sports.create);
  
    // Retrieve all sports
    app.get("/sports", sports.findAll);
  
    // Retrieve a single sports with sportId
    app.get("/sports/:sportsId", sports.findOne);
  
    // Update a sports with sportId
    app.put("/sports/:sportsId", sports.update);
  
    // Delete a sports with sportId
    // app.delete("/sports/:sportsId", sports.delete);
  
    // Create a new sports
    // app.delete("/sports", sports.deleteAll);

    //####################################################//
    // Create a new tournaments
    app.post("/tournaments", tournaments.create);
  
    // Retrieve all tournaments
    app.get("/tournaments", tournaments.findAll);
  
    // Retrieve a single tournaments with tournamentsId
    app.get("/tournaments/:tournamentsId", tournaments.findOne);
  
    // Update a tournaments with tournamentsId
    app.put("/tournaments/:tournamentsId", tournaments.update);
  
    // Delete a tournaments with tournamentsId
    // app.delete("/tournaments/:tournamentsId", tournaments.delete);
  
    // Create a new tournaments
    // app.delete("/tournaments", tournaments.deleteAll);
  };