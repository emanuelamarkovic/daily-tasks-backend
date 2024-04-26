import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "you have to enter the name!"],
    minlength: [3, "name must be at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "you have to enter the email!"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "you have to enter the password!"],
    minlength: [8, "password must be at least 8 characters!"],
  },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
