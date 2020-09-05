const users = require("./users/users.service");
const login = require("./login/login.service");
const rooms = require("./rooms/rooms.service");
const plays = require("./plays/plays.service");

module.exports = (app) => {
  app.configure(users);
  app.configure(login);
  app.configure(rooms);
  app.configure(plays);
};
