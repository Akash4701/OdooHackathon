import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { config } from "dotenv";

config(); // Load .env variables

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Your frontend
        credentials: true
    }
});

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && typeof userId === 'string') {
        socket.join(userId); // Join room by user ID
        console.log(`User ${userId} connected to Socket.IO`);
    }

    socket.on("disconnect", () => {
        console.log("User disconnected from Socket.IO");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
