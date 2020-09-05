const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaySchema = new Schema({
  _roomid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "rooms",
  },
  chance: {
    type: String,
    required: true,
  },
  decks: {
    type: Object,
    required: true,
  },
});

const Play = mongoose.model("plays", PlaySchema);

module.exports = Play;
