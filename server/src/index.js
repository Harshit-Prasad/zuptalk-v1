import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

const server = createServer(app);

// Socket io init
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
    },
});

server.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT} 🟢`);
});

io.on('connection', (socket) => {
    socket.on('user-joined', ({ roomId }) => {
        socket.join(socket.id);
        socket.join(roomId)
        socket.emit('user-connected', { id: socket.id })
        socket.in(roomId).emit("remote-user-joined", { id: socket.id });
    });

    socket.on('local-user-joined', ({ id, roomId }) => {
        socket.in(roomId).emit('local-user-joined', { id })
    });

    socket.on("call-remote-user", ({ from, to, offer }) => {
        io.to(to).emit("remote-user-calling", { offer });
    });

    socket.on('call-answered', ({ from, to, answer }) => {
        io.to(to).emit('call-answered', { answer })
    })

    socket.on('incoming-ice-candidate', ({ from, to, ic }) => {
        io.to(to).emit('add-ice-candidate', { ic })
    })
})