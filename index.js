// NOTE: Import
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const database = require("./src/config/database");
const systemConfig = require("./src/config/system");

const route = require("./src/routers/client/index.route");
const routeAdmin = require("./src/routers/admin/index.route");

database.connect();

// NOTE: Config
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// NOTE: App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// NOTE: Port
const port = process.env.PORT;

// NOTE: route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Connect Success ${port}`);
});
