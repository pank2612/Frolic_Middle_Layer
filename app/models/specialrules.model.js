const sql = require("../config/db.js");

// constructor
const SpecialRules = function(specialrules) {
  this.tournamentId = specialrules.tournamentId;
  this.name = specialrules.name;
  this.shortName = specialrules.shortName;
  this.points = specialrules.points;
};

SpecialRules.create = (newSpecialRules, result) => {
  sql.query("INSERT INTO specialrules SET ?", newSpecialRules, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created SpecialRules: ", { id: res.insertId, ...newSpecialRules });
    result(null, { id: res.insertId, ...newSpecialRules });
  });
};

SpecialRules.findById = (specialrulesId, result) => {
  sql.query(`SELECT * FROM specialrules WHERE id = ${specialrulesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found SpecialRules: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found SpecialRules with the id
    result({ kind: "not_found" }, null);
  });
};

SpecialRules.getAll = result => {
  sql.query("SELECT * FROM specialrules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("SpecialRules: ", res);
    result(null, res);
  });
};

SpecialRules.updateById = (id, specialrules, result) => {
  console.log(id);
  sql.query(
    "UPDATE specialrules SET tournamentId = ?, name = ?, shortName = ?, points = ? WHERE id = ?",
    [specialrules.tournamentId, specialrules.name, specialrules.shortName, specialrules.points, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found SpecialRules with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated SpecialRules: ", { id: id, ...specialrules });
      result(null, { id: id, ...specialrules });
    }
  );
};

module.exports = SpecialRules;