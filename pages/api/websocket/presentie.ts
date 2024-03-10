"use server";
import {NextApiRequest, NextApiResponse} from "next";
import {Server} from "socket.io";
import {
    addPerson,
    createCurrentAttendance,
    getCurrentAttendance,
    togglePerson,
} from "@/components/presentie/attendanceSheet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // @ts-ignore
    if (!res.socket.server.io) {
        console.log('Opening WS...');
        // @ts-ignore
        const io = new Server(res.socket.server, {
            path: '/api/websocket/presentie',
            addTrailingSlash: false,
        });

        io.on('connection', async (socket) => {
            console.log('Client connected');
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
            socket.on('ping', () => {
                console.log('ping');
                socket.emit('pong');
            });
            socket.on('togglePerson', async (person: string) => {
                console.log('Toggle', person);
                await togglePerson(person)
                    .then((newAttendance) => {
                        console.log('Toggled', person);
                        io.emit('attendanceUpdate', newAttendance);
                    })
                    .catch(err => {
                        console.error(err);
                        socket.emit('error', err.toString());
                    });
            });
            socket.on('addPerson', async (person: string) => {
                console.log('Add', person);
                await addPerson(person)
                    .then((newAttendance) => {
                        console.log('Added', person);
                        io.emit('attendanceUpdate', newAttendance);
                    })
                    .catch(err => {
                        console.error(err);
                        socket.emit('error', err.toString());
                    });
            });
            socket.on('newAttendance', async () => {
                await createCurrentAttendance()
                    .then((newAttendance) => {
                        console.log('Sending new attendance:', newAttendance);
                        io.emit('attendanceUpdate', newAttendance);
                    })
                    .catch(err => {
                        console.error(err);
                        socket.emit('error', err.toString());
                    });
            });
            await getCurrentAttendance()
                .then((newAttendance) => {
                    console.log('Sending initial attendance:', newAttendance);
                    socket.emit('attendanceUpdate', newAttendance);
                })
                .catch(err => {
                    console.error(err);
                    socket.emit('error', err.toString());
                });
        });

        // @ts-ignore
        res.socket.server.io = io;

        res.end();
    }
}
