module.exports = app => {
    const sports = require("../controllers/sports.controller.js");
  
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
  };