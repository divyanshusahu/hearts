const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const cors = require("cors");
const mongoose = require("mongoose");

const services = require("./services");

mongoose.Promise = global.Promise;

const MLAB_URI = require("./config/keys").MLAB_URI;

mongoose
  .connect(MLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo Database"))
  .catch((e) => console.log(e));

const app = express(feathers());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.configure(socketio());

app.configure(services);

app.use(express.errorHandler());

app.on("connection", (connection) => app.channel("game").join(connection));

app.publish((data) => app.channel("game"));

module.exports = app;
