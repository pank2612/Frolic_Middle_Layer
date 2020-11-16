const Players = require("../models/players.model.js");

// Create and Save a new Players
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Players
  const players = new Players({
    teamId : req.body.teamId,
    name : req.body.name,
    picture : req.body.picture,
    shortName : req.body.shortName,
    skillsId : req.body.skillsId,
    credits : req.body.credits,
    points : req.body.points,
    status : req.body.status,
    country : req.body.country,
  });

  // Save Players in the database
  Players.create(players, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Players."
      });
    else res.send(data);
  });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  Players.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Players."
      });
    else res.send(data);
  });
};

// Find a single Players with a playersId
exports.findOne = (req, res) => {
  Players.findById(req.params.playersId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Players with id ${req.params.playersId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Players with id " + req.params.playersId
        });
      }
    } else res.send(data);
  });
};

// Update a Players identified by the playersId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Players.updateById(
    req.params.playersId,
    new Players(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Players with id ${req.params.playersId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Players with id " + req.params.playersId
          });
        }
      } else res.send(data);
    }
  );
};
