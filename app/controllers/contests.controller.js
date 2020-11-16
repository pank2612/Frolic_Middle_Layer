const Contests = require("../models/contests.model.js");

// Create and Save a new Contests
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Contests
  const contests = new Contests({
    matchId : req.body.matchId,
    name : req.body.name,
    contestCategory : req.body.contestCategory,
    entryAmount : req.body.entryAmount,
    maxEntries : req.body.maxEntries,
    maxEntriesPerUser : req.body.maxEntriesPerUser,
    status : req.body.status
  });

  // Save Contests in the database
  Contests.create(contests, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contests."
      });
    else res.send(data);
  });
};

// Retrieve all Contests from the database.
exports.findAll = (req, res) => {
  Contests.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contests."
      });
    else res.send(data);
  });
};

// Find a single Contests with a contestsId
exports.findOne = (req, res) => {
  Contests.findById(req.params.contestsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contests with id ${req.params.contestsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contests with id " + req.params.contestsId
        });
      }
    } else res.send(data);
  });
};

// Update a Contests identified by the contestsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Contests.updateById(
    req.params.contestsId,
    new Contests(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contests with id ${req.params.contestsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Contests with id " + req.params.contestsId
          });
        }
      } else res.send(data);
    }
  );
};
