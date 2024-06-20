import { model, Schema } from "mongoose";

const avatarImgSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    url: {
      type: String,
      default: "https://ionicframework.com/docs/img/demos/avatar.svg",
      required: false,
    },
    id: String,
  },
  { id: false }
);
const genders = ["male", "female", "other"];
const roles = ["user", "admin"];
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "you have to enter the name!"],
    minlength: [3, "name must be at least 3 characters!"],
  },
  role: {
    type: String,
    enum: roles,
    default: "user",
  },
  gender: {
    type: String,
    enum: genders,
    required: false,
  },
  email: {
    type: String,
    required: [true, "you have to enter the email!"],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  avatarImg: avatarImgSchema,
  password: {
    type: String,
    required: [true, "you have to enter the password!"],
    minlength: [8, "password must be at least 8 characters!"],
  },
  todos: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  note: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model("User", userSchema);
export default User;
