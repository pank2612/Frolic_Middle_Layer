const SpecialRules = require("../models/specialrules.model.js");

// Create and Save a new SpecialRules
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a SpecialRules
  const specialrules = new SpecialRules({
    tournamentId : req.body.tournamentId,
    name : req.body.name,
    shortName : req.body.shortName,
    points : req.body.points
  });

  // Save SpecialRules in the database
  SpecialRules.create(specialrules, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SpecialRules."
      });
    else res.send(data);
  });
};

// Retrieve all SpecialRules from the database.
exports.findAll = (req, res) => {
  SpecialRules.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SpecialRules."
      });
    else res.send(data);
  });
};

// Find a single SpecialRules with a specialrulesId
exports.findOne = (req, res) => {
  SpecialRules.findById(req.params.specialrulesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found SpecialRules with id ${req.params.specialrulesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving SpecialRules with id " + req.params.specialrulesId
        });
      }
    } else res.send(data);
  });
};

// Update a SpecialRules identified by the specialrulesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  SpecialRules.updateById(
    req.params.specialrulesId,
    new SpecialRules(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found SpecialRules with id ${req.params.specialrulesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating SpecialRules with id " + req.params.specialrulesId
          });
        }
      } else res.send(data);
    }
  );
};
