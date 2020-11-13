const Tournaments = require("../models/tournaments.model.js");

// Create and Save a new Tournaments
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Tournaments
  const tournament = new Tournaments({
    sportsId : req.body.sportsId,
    name: req.body.name,
    description : req.body.description,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    logo : req.body.logo,
    maxPoints : req.body.maxPoints,
    maxPlayers : req.body.maxPlayers,
    country : req.body.country,
    enabled : req.body.enabled,
    maxSingleTeam : req.body.maxSingleTeam,
    deadlineSeconds : req.body.deadlineSeconds,
    teamFolderName : req.body.teamFolderName,
    playerFolderName : req.body.playerFolderName
  });

  // Save Tournaments in the database
  Tournaments.create(tournament, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tournaments."
      });
    else res.send(data);
  });
};

// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
  Tournaments.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tournaments."
      });
    else res.send(data);
  });
};

// Find a single Tournaments with a tournamentId
exports.findOne = (req, res) => {
  Tournaments.findById(req.params.tournamentsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tournaments with id ${req.params.tournamentsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tournaments with id " + req.params.tournamentsId
        });
      }
    } else res.send(data);
  });
};

// Update a Tournaments identified by the tournamentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Tournaments.updateById(
    req.params.tournamentsId,
    new Tournaments(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tournaments with id ${req.params.tournamentsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tournaments with id " + req.params.tournamentsId
          });
        }
      } else res.send(data);
    }
  );
};
