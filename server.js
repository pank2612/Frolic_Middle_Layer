const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var cors = require('cors');

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Frolic application." });
});

require("./app/routes/sports.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});