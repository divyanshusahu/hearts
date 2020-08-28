import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io("http://localhost:3030");
const feathers_client = feathers();

feathers_client.configure(feathers.socketio(socket));

export default feathers_client;
