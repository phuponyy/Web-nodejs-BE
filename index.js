// NOTE: Import
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const database = require("./src/config/database");

const route = require("./src/routers/client/index.route");

database.connect();

// NOTE: Config
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// NOTE: Port
const port = process.env.PORT;

// NOTE: route
route(app);

app.listen(port, () => {
  console.log(`Connect Success ${port}`);
});
