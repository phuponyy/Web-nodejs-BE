// NOTE: Import
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

// const Product = require("./src/models/product.model");
const route = require("./src/routers/client/index.route");

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
