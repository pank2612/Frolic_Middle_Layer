const sql = require("../config/db.js");

// constructor
const Skills = function(skills) {
  this.tournamentId = skills.tournamentId;
  this.name = skills.name;
  this.shortName = skills.shortName;
  this.min = skills.min;
  this.max = skills.max;
};

Skills.create = (newSkills, result) => {
  sql.query("INSERT INTO skills SET ?", newSkills, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Skills: ", { id: res.insertId, ...newSkills });
    result(null, { id: res.insertId, ...newSkills });
  });
};

Skills.findById = (skillsId, result) => {
  sql.query(`SELECT * FROM skills WHERE id = ${skillsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Skills: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Skills with the id
    result({ kind: "not_found" }, null);
  });
};

Skills.getAll = result => {
  sql.query("SELECT * FROM skills", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Skills: ", res);
    result(null, res);
  });
};

Skills.updateById = (id, skills, result) => {
  console.log(id);
  sql.query(
    "UPDATE skills SET tournamentId = ?, name = ?, shortName = ?, min = ?, max = ? WHERE id = ?",
    [skills.tournamentId, skills.name, skills.shortName, skills.min, skills.max, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Skills with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated skills: ", { id: id, ...skills });
      result(null, { id: id, ...skills });
    }
  );
};

module.exports = Skills;