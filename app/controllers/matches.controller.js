const Matches = require("../models/matches.model.js");

// Create and Save a new Matches
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Matches
  const matches = new Matches({
    tournamentId : req.body.tournamentId,
    number : req.body.number,
    startDate : req.body.startDate,
    startTime : req.body.startTime,
    venue : req.body.venue,
    description : req.body.description,
    score : req.body.score,
    team1Id : req.body.team1Id,
    team2Id : req.body.team2Id,
  });

  // Save Matches in the database
  Matches.create(matches, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Matches."
      });
    else res.send(data);
  });
};

// Retrieve all Matches from the database.
exports.findAll = (req, res) => {
  Matches.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Matches."
      });
    else res.send(data);
  });
};

// Find a single Matches with a matchesId
exports.findOne = (req, res) => {
  Matches.findById(req.params.matchesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found matches with id ${req.params.matchesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving matches with id " + req.params.matchesId
        });
      }
    } else res.send(data);
  });
};

// Update a Matches identified by the matchesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Matches.updateById(
    req.params.matchesId,
    new Matches(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Matches with id ${req.params.matchesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Matches with id " + req.params.matchesId
          });
        }
      } else res.send(data);
    }
  );
};
