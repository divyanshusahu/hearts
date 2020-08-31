const users = require("./users/users.service");
const login = require("./login/login.service");

module.exports = (app) => {
  app.configure(users);
  app.configure(login);
};
