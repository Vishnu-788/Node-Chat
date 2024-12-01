import { Server } from "socket.io";
import { Server as HttpServer } from "http";

const socketHandler = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // React app URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", (socket) => {
      console.log("User Disconnected");
    });
  });
};
