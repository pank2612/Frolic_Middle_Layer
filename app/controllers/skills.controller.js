const Skills = require("../models/skills.model.js");

// Create and Save a new Skills
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Skills
  const skills = new Skills({
    tournamentId : req.body.tournamentId,
    name : req.body.name,
    shortName : req.body.shortName,
    min : req.body.min,
    max : req.body.max
  });

  // Save Skills in the database
  Skills.create(skills, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skills."
      });
    else res.send(data);
  });
};

// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
  Skills.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Skills."
      });
    else res.send(data);
  });
};

// Find a single Skills with a skillsId
exports.findOne = (req, res) => {
  Skills.findById(req.params.skillsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Skills with id ${req.params.skillsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Skills with id " + req.params.skillsId
        });
      }
    } else res.send(data);
  });
};

// Update a Skills identified by the skillsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Skills.updateById(
    req.params.skillsId,
    new Skills(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Skills with id ${req.params.skillsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Skills with id " + req.params.skillsId
          });
        }
      } else res.send(data);
    }
  );
};
