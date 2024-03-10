import {NextApiRequest, NextApiResponse} from "next";
import {Server} from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // @ts-ignore
    if (!res.socket.server.io) {
        console.log('Opening WS...');
        // @ts-ignore
        const io = new Server(res.socket.server, {
            path: '/api/websocket/presentie',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('Client connected');
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        // @ts-ignore
        res.socket.server.io = io;

        res.end();
    }
}
