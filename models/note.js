import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = model("Note", noteSchema);

export default Note;
