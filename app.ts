import express from "express";
import { createServer } from "http";
import rootMiddleware from "./middleware";
import rootRouter from "./routes";
import errorMiddleware, {
  generalErrorHandling,
} from "./middleware/errorMiddleware";
import mongoose from "mongoose";
import env from "./utils/envalid";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost",
  },
});

io.on("connection", (socket) => {
  console.log("Client Connected!");
});

app.use(rootMiddleware);
app.use(rootRouter);
app.use(errorMiddleware);
app.use(generalErrorHandling);

mongoose
  .connect(env.MONGO_DB_URL + env.MONGO_DB_COLLECTION)
  .then((result) => {
    server.listen(3000);
  })
  .catch((err) => {
    throw new Error(err);
  });
