const sql = require("../config/db.js");

// constructor
const Prizes = function(prizes) {
  this.contestId = prizes.contestId;
  this.rankRangeStart = prizes.rankRangeStart;
  this.rankRangeEnd = prizes.rankRangeEnd;
  this.amount = prizes.amount;
  this.status = prizes.status;
};

Prizes.create = (newPrizes, result) => {
  sql.query("INSERT INTO prizebreakup SET ?", newPrizes, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Prizes: ", { id: res.insertId, ...newPrizes });
    result(null, { id: res.insertId, ...newPrizes });
  });
};

Prizes.findById = (prizesId, result) => {
  sql.query(`SELECT * FROM prizebreakup WHERE id = ${prizesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Prizes: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Prizes with the id
    result({ kind: "not_found" }, null);
  });
};

Prizes.getAll = result => {
  sql.query("SELECT * FROM prizebreakup", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Prizes: ", res);
    result(null, res);
  });
};

Prizes.updateById = (id, prizes, result) => {
  console.log(id);
  sql.query(
    "UPDATE prizebreakup SET contestId = ?, rankRangeStart = ?, rankRangeEnd = ?, amount = ?, status = ? WHERE id = ?",
    [prizes.contestId, prizes.rankRangeStart, prizes.rankRangeEnd, prizes.amount, prizes.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Prizes with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Prizes: ", { id: id, ...prizes });
      result(null, { id: id, ...prizes });
    }
  );
};

module.exports = Prizes;