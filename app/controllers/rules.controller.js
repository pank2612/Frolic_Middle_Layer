const Rules = require("../models/rules.model.js");

// Create and Save a new Rules
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Rules
  const rules = new Rules({
    tournamentId : req.body.tournamentId,
    name : req.body.name,
    shortName : req.body.shortName,
    points : req.body.points
  });

  // Save Rules in the database
  Rules.create(rules, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rules."
      });
    else res.send(data);
  });
};

// Retrieve all Rules from the database.
exports.findAll = (req, res) => {
  Rules.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rules."
      });
    else res.send(data);
  });
};

// Find a single Rules with a rulesId
exports.findOne = (req, res) => {
  Rules.findById(req.params.rulesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rules with id ${req.params.rulesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rules with id " + req.params.rulesId
        });
      }
    } else res.send(data);
  });
};

// Update a Rules identified by the rulesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Rules.updateById(
    req.params.rulesId,
    new Rules(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rules with id ${req.params.rulesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Rules with id " + req.params.rulesId
          });
        }
      } else res.send(data);
    }
  );
};
