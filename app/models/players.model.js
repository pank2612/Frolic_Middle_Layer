const sql = require("../config/db.js");

// constructor
const Players = function(players) {
  this.teamId = players.teamId;
  this.name = players.name;
  this.picture = players.picture;
  this.shortName = players.shortName;
  this.skillsId = players.skillsId;
  this.credits = players.credits;
  this.points = players.points;
  this.status = players.status;
  this.country = players.country;
};

Players.create = (newPlayers, result) => {
  sql.query("INSERT INTO players SET ?", newPlayers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Players: ", { id: res.insertId, ...newPlayers });
    result(null, { id: res.insertId, ...newPlayers });
  });
};

Players.findById = (playersId, result) => {
  sql.query(`SELECT * FROM players WHERE id = ${playersId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Players: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Players with the id
    result({ kind: "not_found" }, null);
  });
};

Players.getAll = result => {
  sql.query("SELECT * FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Players: ", res);
    result(null, res);
  });
};

Players.updateById = (id, players, result) => {
  console.log(id);
  console.log(players.name);
  sql.query(
    "UPDATE players SET teamId = ?, name = ?, picture = ?, shortName = ?, skillsId = ?, credits = ?, points = ?, status = ?," +
     "country = ? WHERE id = ?",
    [players.teamId, players.name, players.picture, players.shortName, players.skillsId, players.credits,
      players.points, players.status, players.country, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found players with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated players: ", { id: id, ...players });
      result(null, { id: id, ...players });
    }
  );
};

module.exports = Players;