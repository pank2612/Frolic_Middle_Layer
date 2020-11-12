const sql = require("../config/db.js");

// constructor
const Sports = function(sports) {
  this.name = sports.name;
};

Sports.create = (newSports, result) => {
  sql.query("INSERT INTO sports SET ?", newSports, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created sports: ", { id: res.insertId, ...newSports });
    result(null, { id: res.insertId, ...newSports });
  });
};

Sports.findById = (sportId, result) => {
  sql.query(`SELECT * FROM sports WHERE id = ${sportId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sports: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sports with the id
    result({ kind: "not_found" }, null);
  });
};

Sports.getAll = result => {
  sql.query("SELECT * FROM sports", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sports: ", res);
    result(null, res);
  });
};

Sports.updateById = (id, sports, result) => {
  console.log(id);
  console.log(sports.name);
  sql.query(
    "UPDATE sports SET name = ? WHERE id = ?",
    [sports.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sports with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sports: ", { id: id, ...sports });
      result(null, { id: id, ...sports });
    }
  );
};

// Sports.remove = (id, result) => {
//   sql.query("DELETE FROM sports WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Sports with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted Sports with id: ", id);
//     result(null, res);
//   });
// };

// Sports.removeAll = result => {
//   sql.query("DELETE FROM sports", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} Sports`);
//     result(null, res);
//   });
// };

module.exports = Sports;