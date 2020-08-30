const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MLAB_URI: process.env.MLAB_URI,
};
