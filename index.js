// NOTE: Import
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const moment = require("moment");

require("dotenv").config();

const database = require("./src/config/database");
const systemConfig = require("./src/config/system");

const route = require("./src/routers/client/index.route");
const routeAdmin = require("./src/routers/admin/index.route");

database.connect();

//NOTE: tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// NOTE: Config
app.set("views", path.join(`${__dirname}/src/views`));
app.set("view engine", "pug");
app.use(express.static(path.join(`${__dirname}/public`)));

// Flash
app.use(cookieParser("0934815205")); // Secret for signing cookies
app.use(
  session({
    secret: "0934815205", // Add a secret key here
    resave: false, // Do not save session if it is unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: { maxAge: 60000 }, // Expire after 1 minute
  })
);
app.use(flash()); // Initialize flash after session
// End Flash

//Plugin: method-override
app.use(methodOverride("_method"));

//Plugin: body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// NOTE: App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// NOTE: Port
const port = process.env.PORT;

// NOTE: route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Connect Success ${port}`);
});
