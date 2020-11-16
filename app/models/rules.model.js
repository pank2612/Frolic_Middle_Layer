const sql = require("../config/db.js");

// constructor
const Rules = function(rules) {
  this.tournamentId = rules.tournamentId;
  this.name = rules.name;
  this.shortName = rules.shortName;
  this.points = rules.points;
};

Rules.create = (newRules, result) => {
  sql.query("INSERT INTO rules SET ?", newRules, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Rules: ", { id: res.insertId, ...newRules });
    result(null, { id: res.insertId, ...newRules });
  });
};

Rules.findById = (rulesId, result) => {
  sql.query(`SELECT * FROM rules WHERE id = ${rulesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rules: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rules with the id
    result({ kind: "not_found" }, null);
  });
};

Rules.getAll = result => {
  sql.query("SELECT * FROM rules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Rules: ", res);
    result(null, res);
  });
};

Rules.updateById = (id, rules, result) => {
  console.log(id);
  sql.query(
    "UPDATE rules SET tournamentId = ?, name = ?, shortName = ?, points = ? WHERE id = ?",
    [rules.tournamentId, rules.name, rules.shortName, rules.points, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Rules with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Rules: ", { id: id, ...rules });
      result(null, { id: id, ...rules });
    }
  );
};

module.exports = Rules;