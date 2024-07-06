import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { generateToken04 } from './zego/server-assistent.zego.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.post('/api/zego-auth-token', (req, res) => {
    try {
        const userId = req.body.userId;
        const time = 3600;

        const appId = process.env.ZEGO_APP_ID
        const secret = process.env.ZEGO_SERVER_SECRET

        const token = generateToken04(Number(appId), userId, secret, time);

        console.log('>>>', token);

        return res.json(token)
    } catch (error) {
        console.log(error);
        return res.send({ error: true })
    }
})

const server = createServer(app);

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
    console.log(socket.id);
    socket.on('user-joined', ({ roomId }) => {
        socket.join(socket.id);
        socket.join(roomId)
        socket.emit('user-connected', { id: socket.id })
        socket.in(roomId).emit("remote-user-joined", { id: socket.id });
    });

    socket.on('local-user-joined', ({ id, roomId }) => {
        socket.in(roomId).emit('local-user-joined', { id })
    });
})