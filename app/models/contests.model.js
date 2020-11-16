const sql = require("../config/db.js");

// constructor
const Contests = function(contests) {
  this.matchId = contests.matchId;
  this.name = contests.name;
  this.contestCategory = contests.contestCategory;
  this.entryAmount = contests.entryAmount;
  this.maxEntries = contests.maxEntries;
  this.maxEntriesPerUser = contests.maxEntriesPerUser;
  this.status = contests.status;
};

Contests.create = (newContests, result) => {
  sql.query("INSERT INTO contests SET ?", newContests, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created contests: ", { id: res.insertId, ...newContests });
    result(null, { id: res.insertId, ...newContests });
  });
};

Contests.findById = (contestsId, result) => {
  sql.query(`SELECT * FROM contests WHERE id = ${contestsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contests: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Contests with the id
    result({ kind: "not_found" }, null);
  });
};

Contests.getAll = result => {
  sql.query("SELECT * FROM contests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Contests: ", res);
    result(null, res);
  });
};

Contests.updateById = (id, contests, result) => {
  console.log(id);
  console.log(contests.name);
  sql.query(
    "UPDATE contests SET matchId = ?, name = ?, contestCategory = ?, entryAmount = ?, maxEntries = ?, maxEntriesPerUser = ?, status = ?" +
     " WHERE id = ?",
    [contests.matchId, contests.name, contests.contestCategory, contests.entryAmount, contests.maxEntries, contests.maxEntriesPerUser,
      contests.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found contests with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contests: ", { id: id, ...contests });
      result(null, { id: id, ...contests });
    }
  );
};

module.exports = Contests;