import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World");
});

export { app };
