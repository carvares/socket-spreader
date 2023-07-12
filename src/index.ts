import "../setup";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { io as tipsServer } from "socket.io-client";
// import { createAdapter } from "@socket.io/cluster-adapter";
// import { setupWorker } from "@socket.io/sticky";
import http from "http";
import { TipsStorage } from "./utils";

const app = express();
app.use([express.json(), cors()]);
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// io.adapter(createAdapter());

// setupWorker(io);

const tips = tipsServer("ws://35.198.15.58:5000");
const pastTips = new TipsStorage();

io.on("connection", (socket) => {
  Object.keys(pastTips.tips).forEach((event) => {
    io.emit(event, pastTips.getTips(event));
  });
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});
tips.onAny((event, ...args) => {
  if (event === "connect") return;
  io.emit(event, ...args);
  pastTips.addTip(event, args);
});

app.get("/", (_, res) => {
  res.sendStatus(200);
});

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
