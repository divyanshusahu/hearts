import io from "socket.io-client";
import feathers from "@feathersjs/client";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://hearts-server.herokuapp.com/";

const socket = io(URL);
const feathers_client = feathers();

feathers_client.configure(feathers.socketio(socket, { timeout: 15000 }));

export default feathers_client;
