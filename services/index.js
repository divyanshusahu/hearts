const users = require("./users/users.service");
const login = require("./login/login.service");
const rooms = require("./rooms/rooms.service");

module.exports = (app) => {
  app.configure(users);
  app.configure(login);
  app.configure(rooms);
};
