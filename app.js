import express from "express";
import { Server } from "socket.io";
import createServer from "http";

const port = 3000;
const app = express();
const server = createServer(app); // server created using http
const io = new Server(server, {}); // this represents the whole circuit

app.listen(port, () => {
  console.log("Server is active at " + port);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  console.log("User got connected with id : " + socket.id);
});
