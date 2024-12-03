import { Server } from "socket.io";
import { Server as HttpServer } from "http";

const socketHandler = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React app URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (msg) => {
      console.log(`Message received from ${socket.id}:`, msg);

      // Broadcast the message to all connected clients
      io.emit("message", msg); // Use io.emit to send to everyone, including the sender
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketHandler;
