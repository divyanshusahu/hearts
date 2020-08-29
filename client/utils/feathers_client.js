import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io("http://localhost:3030");
//const socket = io("https://hearts-server.herokuapp.com/");
const feathers_client = feathers();

feathers_client.configure(feathers.socketio(socket, { timeout: 15000 }));

export default feathers_client;
