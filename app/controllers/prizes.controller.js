const Prizes = require("../models/prizes.model.js");

// Create and Save a new Prizes
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Prizes
  const prizes = new Prizes({
    contestId : req.body.contestId,
    rankRangeStart : req.body.rankRangeStart,
    rankRangeEnd : req.body.rankRangeEnd,
    amount : req.body.amount,
    status : req.body.status
  });

  // Save Prizes in the database
  Prizes.create(prizes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Prizes."
      });
    else res.send(data);
  });
};

// Retrieve all Prizes from the database.
exports.findAll = (req, res) => {
  Prizes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Prizes."
      });
    else res.send(data);
  });
};

// Find a single Prizes with a prizesId
exports.findOne = (req, res) => {
  Prizes.findById(req.params.prizesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found prizes with id ${req.params.prizesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving prizes with id " + req.params.prizesId
        });
      }
    } else res.send(data);
  });
};

// Update a Prizes identified by the prizesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Prizes.updateById(
    req.params.prizesId,
    new Prizes(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prizes with id ${req.params.prizesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Prizes with id " + req.params.prizesId
          });
        }
      } else res.send(data);
    }
  );
};
