// NOTE: Import
const express = require("express");
const app = express();
// const Product = require("./models/product.model");

// NOTE: Setup pug
app.set('views', './views')
app.set('view engine', 'pug')

// NOTE: Port
const port = 3000;

app.get("/", (req, res) => {
  res.render("Hello World");
});

app.listen(port, () => {
  console.log("Connect Success");
});