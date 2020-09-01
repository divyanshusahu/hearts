const service = require("feathers-mongoose");
const isEmpty = require("is-empty");

const Room = require("../../models/Room");

module.exports = (app) => {
  app.use("/rooms", service({ Model: Room }));

  app.service("/rooms").hooks({
    before: {
      create: [
        async (context) => {
          let code = 1000 + Math.floor(Math.random() * 9000);
          let isRoomExist = await Room.findOne({ code: code });
          while (isRoomExist) {
            code = 1000 + Math.floor(Math.random() * 9000);
            isRoomExist = await Room.findOne({ code: code });
          }
          context.data.code = code;
          context.data.open = true;
          context.data.players = [context.data.room_creator];
          delete context.data.room_creator;
          return context;
        },
      ],
      patch: [
        async (context) => {
          let isRoomExist = await Room.findOne({ code: context.id });
          if (isEmpty(isRoomExist)) {
            context.result = { success: false, message: "Invalid Room Code" };
            return context;
          }
          context.id = isRoomExist._id;
          if (isRoomExist.players.includes(context.data.player_name)) {
            context.result = {
              success: true,
              _id: isRoomExist["_id"],
              players: isRoomExist.players,
              open: isRoomExist.open,
            };
            return context;
          }
          context.data.players = isRoomExist.players;
          context.data.players.push(context.data.player_name);
          delete context.data.player_name;
          return context;
        },
      ],
    },
    after: {
      get: [
        async (context) => {
          context.result.success = true;
          return context;
        },
      ],
      create: [
        async (context) => {
          if (!isEmpty(context.result["_id"])) {
            delete context.result["__v"];
            context.success = true;
            return context;
          }
          delete context.result;
          context.result.success = false;
          return context;
        },
      ],
      patch: [
        async (context) => {
          if (isEmpty(context.result.success)) {
            context.result.success = true;
          }
          return context;
        },
      ],
    },
    error: {
      get: [
        async (context) => {
          if (isEmpty(context.result)) {
            context.result = { success: false };
            return context;
          }
          return context;
        },
      ],
      patch: [
        async (context) => {
          if (isEmpty(context.result)) {
            context.result = { success: false, message: "Invalid Code" };
          }
          return context;
        },
      ],
    },
  });
};
