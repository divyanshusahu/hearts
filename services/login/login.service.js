const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");

const User = require("../../models/User");

class LoginService {
  async create(data) {
    const isUserExist = await User.findOne({
      username: data.username,
    });
    if (isEmpty(isUserExist)) {
      return {
        status: false,
        message: "User does not exist",
      };
    }
    let isPasswordMatch = await bcrypt.compare(
      data.password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return {
        status: false,
        message: "Incorrect password",
      };
    }
    let token = jwt.sign(
      { username: data.username },
      require("../../config/keys").JWT_SECRET_KEY,
      {
        expiresIn: 86400 * 7,
      }
    );
    return { success: true, message: "Login successful", token: token };
  }
}

module.exports = (app) => {
  app.use("/login", new LoginService());
};
