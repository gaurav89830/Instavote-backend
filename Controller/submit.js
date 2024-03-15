import sendToAll from "../Utility/sendToAll.js";
import quesData from "../quesData.js";

export default function submit({ choosedAns }, id, io) {
//   const actualAns = quesData.correctId - 1;
  if (choosedAns > 3 || choosedAns < 0)
    return io.to(id).emit("failed", { msg: "Invalid Option Not possible " });

  quesData.options[choosedAns].optionVotes++;
  quesData.totalVotes++;

  // io.to(id).emit("submitted", {  });
  console.log("data exported");
  sendToAll("updateQuestion", quesData, io);
}
