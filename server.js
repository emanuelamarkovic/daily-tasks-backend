import "./config.js";
import express from "express";
import "./db-connect.js";
import router from "./routes/tasks.js";
import logEndPoints from "./utils/logEndpoints.js";
import cors from "cors";

const port = process.env.PORT;
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:19007",
  "https://daily-tasks-app-my36.onrender.com/",
  "exp://192.168.178.27:8082",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/tasks", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  logEndPoints(app, port);
});
