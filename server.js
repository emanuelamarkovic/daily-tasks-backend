import "./config.js";
import express from "express";
import "./db-connect.js";
import router from "./routes/tasks.js";
import logEndPoints from "./utils/logEndpoints.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import { refreshAccessToken } from "./Middleware/JWT-Auth/JWT-Auth.js";
import cookieParser from "cookie-parser";
import { DEVELOPER_IP, LOCAL_IP } from "./config.js";
import router from "./routes/tasks.js";
import { MOBILE_IP } from "./config.js";
import { DEVELOPER_IP } from "./config.js";

const port = process.env.PORT;
const app = express();


app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:19006",
  "https://daily-tasks-app-my36.onrender.com",
  `http:${LOCAL_IP}:8081`,
  `exp://${DEVELOPER_IP}:8081`,
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
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/tasks", router);
app.use("/users", userRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

app.use(refreshAccessToken);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  logEndPoints(app, port);
});
