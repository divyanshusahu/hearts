const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const { v4: uuidv4 } = require("uuid");

class RoomService {
  constructor() {
    this.rooms = [];
  }

  async get(id) {
    let room;
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id === id) {
        room = this.rooms[i];
        break;
      }
    }
    if (room) {
      return { success: true, room: room };
    }
    return { success: false };
  }

  async create(data) {
    let room_code = 1000 + Math.floor(Math.random() * 9000);
    while (this.rooms.includes(room_code)) {
      room_code = 1000 + Math.floor(Math.random() * 9000);
    }
    const room = {
      id: uuidv4(),
      room_code: room_code,
      players: [data.player_name],
      open: true,
    };
    this.rooms.push(room);

    return room;
  }

  async patch(room_code, body) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (
        parseInt(room_code) === this.rooms[i].room_code &&
        this.rooms[i].open &&
        this.rooms[i].players.length < 5
      ) {
        this.rooms[i].players.push(body.player_name);
        return { success: true, room: this.rooms[i] };
      } else {
        return { success: false };
      }
    }
    return { success: false };
  }
}

const app = express(feathers());

app.use(express.json());
app.configure(socketio());

app.use("/rooms", new RoomService());

app.use(express.errorHandler());

app.on("connection", (connection) => app.channel("game").join(connection));

app.publish((data) => app.channel("game"));

const PORT = process.env.PORT || 3030;

app
  .listen(PORT)
  .on("listening", () =>
    console.log(`Feathersjs service started on port ${PORT}`)
  );
