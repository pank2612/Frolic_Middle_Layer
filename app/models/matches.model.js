const sql = require("../config/db.js");

// constructor
const Matches = function(matches) {
  this.tournamentId = matches.tournamentId;
  this.number = matches.number;
  this.startDate = matches.startDate;
  this.startTime = matches.startTime;
  this.venue = matches.venue;
  this.description = matches.description;
  this.score = matches.score;
  this.team1Id = matches.team1Id;
  this.team2Id = matches.team2Id;
};

Matches.create = (newMatches, result) => {
  sql.query("INSERT INTO matches SET ?", newMatches, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created matches: ", { id: res.insertId, ...newMatches });
    result(null, { id: res.insertId, ...newMatches });
  });
};

Matches.findById = (matchesId, result) => {
  sql.query(`SELECT * FROM matches WHERE id = ${matchesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found matches: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found matches with the id
    result({ kind: "not_found" }, null);
  });
};

Matches.getAll = result => {
  sql.query("SELECT * FROM matches", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("matches: ", res);
    result(null, res);
  });
};

Matches.updateById = (id, matches, result) => {
  console.log(id);
  sql.query(
    "UPDATE matches SET tournamentId = ?, number = ?, startDate = ?, startTime = ?, venue = ?, description = ?, score = ?, team1Id = ?," +
     "team2Id = ? WHERE id = ?",
    [matches.tournamentId, matches.number, matches.startDate, matches.startTime, matches.venue, matches.description,
      matches.score, matches.team1Id, matches.team2Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found matches with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated matches: ", { id: id, ...matches });
      result(null, { id: id, ...matches });
    }
  );
};

module.exports = Matches;