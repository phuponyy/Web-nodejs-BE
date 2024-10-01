// NOTE: Import
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

require("dotenv").config();

const database = require("./src/config/database");
const systemConfig = require("./src/config/system");

const route = require("./src/routers/client/index.route");
const routeAdmin = require("./src/routers/admin/index.route");

database.connect();

// NOTE: Config
app.set("views", path.join(`${__dirname}/src/views`));
app.set("view engine", "pug");
app.use(express.static(path.join(`${__dirname}/public`)));

//NOTE: tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Flash
app.use(cookieParser("0934815205"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

//Plugin: method-override
app.use(methodOverride("_method"));

//Plugin: body-parser
app.use(bodyParser.urlencoded({ extended: true }));

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
