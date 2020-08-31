const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MLAB_URI: process.env.MLAB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
