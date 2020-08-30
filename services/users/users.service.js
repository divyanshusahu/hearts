const service = require("feathers-mongoose");
const bcrypt = require("bcryptjs");
const isEmpty = require("is-empty");

const User = require("../../models/User");

module.exports = (app) => {
  app.use("/users", service({ Model: User }));

  app.service("/users").hooks({
    before: {
      create: [
        async (context) => {
          const isUserExist = await User.findOne({
            username: context.data.username,
          });
          if (!isEmpty(isUserExist)) {
            context.result = {
              success: false,
              message: "Username not available",
            };
            return context;
          }
          if (context.data.password.length < 8) {
            context.result = {
              success: false,
              message: "Password length must be atleast 8 characters long",
            };
            return context;
          }
          const salt = await bcrypt.genSalt(10);
          const hashed_password = await bcrypt.hash(
            context.data.password,
            salt
          );
          context.data.password = hashed_password;
          return context;
        },
      ],
    },
    after: {
      create: [
        async (context) => {
          if (!isEmpty(context.result["_id"])) {
            delete context.result;
            context.result = {
              success: true,
              message: "Account successfully created",
            };
          }
          return context;
        },
      ],
    },
  });
};
