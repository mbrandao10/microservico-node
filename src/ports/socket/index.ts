import { Server } from "http";
import { Server as SocketIO } from "socket.io";
import { ValidationError } from "@/helpers/error";

let io: SocketIO;

let joinRoom: { [key: string]: string } = {};

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    cors: {
      // origin: process.env["FRONTEND_URL"]
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (data: any) => {
      console.log("join-room", socket.id);

      const { user_id } = data;
      if (user_id && joinRoom[user_id]) {
        joinRoom[user_id] = socket.id;
        return;
      }
      console.log("join-room", joinRoom);

      joinRoom = {
        ...joinRoom,
        [user_id]: socket.id
      };
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(joinRoom).find((item) => {
        return joinRoom[item] === socket.id;
      });
      if (userId) {
        delete joinRoom[userId];
      }
    });
  });

  return io;
};

export const socketIO = (): SocketIO => {
  if (!io) {
    throw new ValidationError("Socket.io not initialized");
  }
  return io;
};

type EmitOwnEventsIO = {
  userId: string;
  event: string;
  data: Record<string, unknown>;
};

export const emitOwnEventsIO = (dataEmit: EmitOwnEventsIO) => {
  const { userId, event, data } = dataEmit;
  const io = socketIO();
  const socketId = joinRoom[userId];

  if (!socketId) {
    return;
  }

  io.to(socketId).emit(event, data);
};
