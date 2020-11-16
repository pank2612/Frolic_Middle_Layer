const sql = require("../config/db.js");

// constructor
const Teams = function(teams) {
  this.tournamentId = teams.tournamentId;
  this.name = teams.name;
  this.shortName = teams.shortName;
  this.logo = teams.logo;
};

Teams.create = (newTeams, result) => {
  sql.query("INSERT INTO teams SET ?", newTeams, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Teams: ", { id: res.insertId, ...newTeams });
    result(null, { id: res.insertId, ...newTeams });
  });
};

Teams.findById = (teamsId, result) => {
  sql.query(`SELECT * FROM teams WHERE id = ${teamsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Teams: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found teams with the id
    result({ kind: "not_found" }, null);
  });
};

Teams.getAll = result => {
  sql.query("SELECT * FROM teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Teams: ", res);
    result(null, res);
  });
};

Teams.updateById = (id, teams, result) => {
  console.log(id);
  console.log(teams.name);
  sql.query(
    "UPDATE teams SET tournamentId = ?, name = ?, shortName = ?, logo = ? WHERE id = ?",
    [teams.tournamentId, teams.name, teams.shortName, teams.logo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found teams with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated teams: ", { id: id, ...teams });
      result(null, { id: id, ...teams });
    }
  );
};

module.exports = Teams;