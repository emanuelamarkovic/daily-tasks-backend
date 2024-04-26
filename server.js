import "./config.js";
import express from "express";
import "./db-connect.js";
import logEndPoints from "./utils/logEndpoints.js";
import router from "./routes/tasks.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/tasks", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  logEndPoints(app, port);
});
