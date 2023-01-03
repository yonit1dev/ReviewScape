import { PrismaClient } from "@prisma/client";
import express from "express";
import UserRepo from "./accountService/infrastructure/repository/UserRepo";
import UserRouter from "./accountService/entrypoints/routers/UserRouter";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const userRepo = new UserRepo(prisma);

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello World");
});

app.use("/auth", UserRouter.configRouter(userRepo));

export { app };
