const Teams = require("../models/teams.model.js");

// Create and Save a new Teams
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Teams
  const teams = new Teams({
    tournamentId : req.body.tournamentId,
    name : req.body.name,
    shortName : req.body.shortName,
    logo : req.body.logo
  });

  // Save Teams in the database
  Teams.create(teams, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teams."
      });
    else res.send(data);
  });
};

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  Teams.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teams."
      });
    else res.send(data);
  });
};

// Find a single Teams with a teamsId
exports.findOne = (req, res) => {
  Teams.findById(req.params.teamsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found teams with id ${req.params.teamsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving teams with id " + req.params.teamsId
        });
      }
    } else res.send(data);
  });
};

// Update a Teams identified by the teamsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Teams.updateById(
    req.params.teamsId,
    new Teams(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teams with id ${req.params.teamsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Teams with id " + req.params.teamsId
          });
        }
      } else res.send(data);
    }
  );
};
