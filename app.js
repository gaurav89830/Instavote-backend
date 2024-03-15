import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import uploadQuestion from "./Controller/uploadQuestion.js";
import submit from "./Controller/submit.js";

import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(port, () => {
  console.log("Server is active at " + port);
});

io.on("connection", (socket) => {
  console.log("User got connected with id : " + socket.id);

  // Upload by teacher
  socket.on("uploadQuestion", (data) => uploadQuestion(data, socket.id, io));

  // vote
  socket.on("submit", (data) => submit(data, socket.id, io));

  // // If student or a teacher leaves the room
  // socket.on("disconnect", (data) => disconnect(data, socket.id, io));
});

//   socket.emit("welcome", "Welcome to the server baby!");
//   socket.on("disconnect", console.log("User disconnected", socket.id));
//   socket.on("chat", (data) => socket.broadcast.emit("receiveChat", data));
