export default function sendToAll(event, data, io) {
  io.emit(event, data);
  console.log("Ques emitted to all");
}
