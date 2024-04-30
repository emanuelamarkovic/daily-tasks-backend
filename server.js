import "./config.js";
import express from "express";
import "./db-connect.js";
import router from "./routes/tasks.js";
import logEndPoints from "./utils/logEndpoints.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:19006",
  "https://daily-tasks-app-my36.onrender.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/tasks", router);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  logEndPoints(app, port);
});
