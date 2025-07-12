import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { config } from "dotenv";
import './worker/notificationWorker'; // Import worker to start it

config(); // Load .env variables

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket:any) => {
    const userId = socket.handshake.query.userId;

    if (userId && typeof userId === 'string') {
        socket.join(userId); // Join room by user ID
        console.log(`User ${userId} connected to Socket.IO`);
    } else {
        console.log('User connected without userId');
    }

    socket.on("disconnect", () => {
        console.log("User disconnected from Socket.IO");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});