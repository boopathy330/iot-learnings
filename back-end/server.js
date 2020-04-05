const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to back-end." });
});

// set port, listen for requests
require("./app/routes/routes")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
