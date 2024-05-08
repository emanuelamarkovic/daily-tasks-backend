import { model, Schema } from "mongoose";


const avatarImgSchema = new Schema(
  {
    url: {
      type: String,
      default: "https://ionicframework.com/docs/img/demos/avatar.svg",
    },
    id: String

  },
  {  id: false }
);
const genders = ['male', 'female', 'other'];

const roles=['user', 'admin']

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "you have to enter the name!"],
    minlength: [3, "name must be at least 3 characters!"],
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },   gender: {
    type: String,
    enum: genders,
    required: false
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
  avatarImg:avatarImgSchema,
  
  password: {
    type: String,
    required: [true, "you have to enter the password!"],
    minlength: [8, "password must be at least 8 characters!"],
  },
<<<<<<< HEAD
=======
  todos: [{ type: Schema.Types.ObjectId, ref: "Task" }],
>>>>>>> 4c6fc616814f6fedb3b59f92d3dae0f9f8c03894
  createdAt: {
    type: Date,
    default: Date.now,
  },


});

const User = model("User", userSchema);

export default User;
