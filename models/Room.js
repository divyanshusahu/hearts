const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  players: {
    type: Array,
    required: true,
    expires: 21600,
  },
  open: {
    type: Boolean,
    required: true,
  },
});

const Room = mongoose.model("rooms", RoomSchema);

module.exports = Room;
