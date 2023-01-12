import express from "express";
import UserRouter from "./accountService/entrypoints/routers/UserRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World");
});

app.use("/auth", UserRouter.configRouter());
app.use("/review", (req, res) => {
  res.statusCode = 200;
  res.send("Review Service");
});
app.use("/product", (req, res) => {
  res.statusCode = 200;
  res.send("Product Service");
});
app.use("/vendor", (req, res) => {
  res.statusCode = 200;
  res.send("Vendor Service");
});
app.use("/review", (req, res) => {
  res.statusCode = 200;
  res.send("Review Service");
});

export { app };
