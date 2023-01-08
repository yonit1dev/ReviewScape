import express from "express";
import UserRouter from "./accountService/entrypoints/routers/UserRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World");
});

app.use("/auth", UserRouter.configRouter());

export { app };
