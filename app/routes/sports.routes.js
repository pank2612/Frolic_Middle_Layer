module.exports = app => {
    const sports = require("../controllers/sports.controller.js");
    const tournaments = require("../controllers/tournaments.controller.js");
    const matches = require("../controllers/matches.controller.js");

    const teams = require("../controllers/teams.controller.js");
    const contests = require("../controllers/contests.controller.js");
    const prizes = require("../controllers/prizes.controller.js");
    const skills = require("../controllers/skills.controller.js");
    const rules = require("../controllers/rules.controller.js");
    const specialrules = require("../controllers/specialrules.controller.js");
    const players = require("../controllers/players.controller.js");
  
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

    //####################################################//
    // Create a new Matches
    app.post("/matches", matches.create);
  
    // Retrieve all Matches
    app.get("/matches", matches.findAll);
  
    // Retrieve a single Matches with matchesId
    app.get("/matches/:matchesId", matches.findOne);
  
    // Update a Matches with matchesId
    app.put("/matches/:matchesId", matches.update);

    //####################################################//
    // Create a new Teams
    app.post("/teams", teams.create);
  
    // Retrieve all Teams
    app.get("/teams", teams.findAll);
  
    // Retrieve a single Teams with teamsId
    app.get("/teams/:teamsId", teams.findOne);
  
    // Update a Teams with teamsId
    app.put("/teams/:teamsId", teams.update);


    //####################################################//
    // Create a new Players
    app.post("/players", players.create);
  
    // Retrieve all Players
    app.get("/players", players.findAll);
  
    // Retrieve a single Players with playersId
    app.get("/players/:playersId", players.findOne);
  
    // Update a Players with playersId
    app.put("/players/:playersId", players.update);

    //####################################################//
    // Create a new Contests
    app.post("/contests", contests.create);
  
    // Retrieve all contests
    app.get("/contests", contests.findAll);
  
    // Retrieve a single contests with contestsId
    app.get("/contests/:contestsId", contests.findOne);
  
    // Update a contests with contestsId
    app.put("/contests/:contestsId", contests.update);

    //####################################################//
    // Create a new Prizes
    app.post("/prizes", prizes.create);
  
    // Retrieve all Prizes
    app.get("/prizes", prizes.findAll);
  
    // Retrieve a single Prizes with prizesId
    app.get("/prizes/:prizesId", prizes.findOne);
  
    // Update a Prizes with prizesId
    app.put("/prizes/:prizesId", prizes.update);


    //####################################################//
    // Create a new Skills
    app.post("/skills", skills.create);
  
    // Retrieve all Skills
    app.get("/skills", skills.findAll);
  
    // Retrieve a single Skills with skillsId
    app.get("/skills/:skillsId", skills.findOne);
  
    // Update a Skills with skillsId
    app.put("/skills/:skillsId", skills.update);


    //####################################################//
    // Create a new Rules
    app.post("/rules", rules.create);
  
    // Retrieve all Rules
    app.get("/rules", rules.findAll);
  
    // Retrieve a single Rules with rulesId
    app.get("/rules/:rulesId", rules.findOne);
  
    // Update a Rules with rulesId
    app.put("/rules/:rulesId", rules.update);


    //####################################################//
    // Create a new SpecialRules
    app.post("/specialrules", specialrules.create);
  
    // Retrieve all SpecialRules
    app.get("/specialrules", specialrules.findAll);
  
    // Retrieve a single SpecialRules with specialrulesId
    app.get("/specialrules/:specialrulesId", specialrules.findOne);
  
    // Update a SpecialRules with specialrulesId
    app.put("/specialrules/:specialrulesId", specialrules.update);
  };