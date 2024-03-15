import sendToAll from "../Utility/sendToAll.js";
import quesData from "../quesData.js";

export default function uploadQuestion(data, id, io) {
  data = data.formData;
  if (
    !data ||
    !data.questionText ||
    data.options.filter((d) => d.optionText == "").length
  )
    return io.to(id).emit("failed", { msg: "Fill Question Properly" });

  if (data.correctId === -1)
    return io
      .to(id)
      .emit("failed", { msg: "Select Correct Answer For Question" });

  Object.assign(quesData, data);
  sendToAll("newQuestion", data, io);
}

export { quesData };
