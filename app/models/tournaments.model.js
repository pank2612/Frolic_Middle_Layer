const sql = require("../config/db.js");

// constructor
const Tournaments = function(tournaments) {
  this.sportsId = tournaments.sportsId;
  this.name = tournaments.name;
  this.description = tournaments.description;
  this.startDate = tournaments.startDate;
  this.endDate = tournaments.endDate;
  this.logo = tournaments.logo;
  this.maxPoints = tournaments.maxPoints;
  this.maxPlayers = tournaments.maxPlayers;
  this.country = tournaments.country;
  this.enabled = tournaments.enabled;
  this.maxSingleTeam = tournaments.maxSingleTeam;
  this.deadlineSeconds = tournaments.deadlineSeconds;
  this.teamFolderName = tournaments.teamFolderName;
  this.playerFolderName = tournaments.playerFolderName;
};

Tournaments.create = (newTournaments, result) => {

  sql.query("INSERT INTO tournaments SET ?", newTournaments, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Tournaments: ", { id: res.insertId, ...newTournaments });
    result(null, { id: res.insertId, ...newTournaments });
  });
};

Tournaments.findById = (tournamentsId, result) => {
  sql.query(`SELECT * FROM tournaments WHERE id = ${tournamentsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Tournaments: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tournaments with the id
    result({ kind: "not_found" }, null);
  });
};

Tournaments.getAll = result => {
  sql.query("SELECT * FROM tournaments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Tournaments: ", res);
    result(null, res);
  });
};

Tournaments.updateById = (id, tournaments, result) => {
  console.log(id);
  console.log(tournaments.name);
  sql.query(
    "UPDATE tournaments SET name = ?, sportsId = ?, description = ?, startDate = ?, endDate = ?, logo = ?,maxPoints = ?,maxPlayers = ?," +
     "country = ?,enabled = ?,maxSingleTeam = ?,deadlineSeconds = ?,teamFolderName = ?,playerFolderName = ? WHERE id = ?",
    [tournaments.name, tournaments.sportsId, tournaments.description, tournaments.startDate, tournaments.endDate, tournaments.logo,
      tournaments.maxPoints, tournaments.maxPlayers, tournaments.country, tournaments.enabled, tournaments.maxSingleTeam, tournaments.deadlineSeconds,
      tournaments.teamFolderName, tournaments.playerFolderName, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tournaments with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Tournaments: ", { id: id, ...tournaments });
      result(null, { id: id, ...tournaments });
    }
  );
};

module.exports = Tournaments;