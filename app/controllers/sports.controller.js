const Sports = require("../models/sports.model.js");

// Create and Save a new Sports
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
console.log("name :" + req.body.name);
  // Create a Sports
  const sport = new Sports({
    name: req.body.name,
    shortCode : req.body.shortCode,
    logo : req.body.logo,
  });

  // Save Sports in the database
  Sports.create(sport, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sports."
      });
    else res.send(data);
  });
};

// Retrieve all Sports from the database.
exports.findAll = (req, res) => {
  Sports.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sports."
      });
    else res.send(data);
  });
};

// Find a single Sports with a sportId
exports.findOne = (req, res) => {
  Sports.findById(req.params.sportsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sports with id ${req.params.sportId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Sports with id " + req.params.sportId
        });
      }
    } else res.send(data);
  });
};

// Update a Sports identified by the sportsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  console.log(req.params);

  Sports.updateById(
    req.params.sportsId,
    new Sports(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sports with id ${req.params.sportsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Sports with id " + req.params.sportId
          });
        }
      } else res.send(data);
    }
  );
};

// // Delete a Sports with the specified sportId in the request
// exports.delete = (req, res) => {
//   Sports.remove(req.params.sportId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Sports with id ${req.params.sportId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Sports with id " + req.params.sportId
//         });
//       }
//     } else res.send({ message: `Sports was deleted successfully!` });
//   });
// };

// // Delete all Sports from the database.
// exports.deleteAll = (req, res) => {
//   Sports.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Sports."
//       });
//     else res.send({ message: `All Sports were deleted successfully!` });
//   });
// };