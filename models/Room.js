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
  },
  open: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 21600,
  },
});

const Room = mongoose.model("rooms", RoomSchema);

module.exports = Room;
