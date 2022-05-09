// import modules and packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const allRoutes = require("./controllers");

// configure express
const app = express();
const PORT = process.env.PORT || 3000;

// import models to sync
const { User, Blog } = require("./models");

// handlers for express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// static directory
app.use(express.static('public'));

// configure handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set home route
app.use("/", allRoutes);

// sync sequelize
sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});