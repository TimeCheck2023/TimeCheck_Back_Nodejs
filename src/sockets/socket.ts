import { Server, Socket } from 'socket.io';
import pool from '../database/Connection';
import { number, string } from 'joi';

interface likes {
    likes: number;
    id_evento: number;
    numero_documento: string;
}


export class Socket_io {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    configureSocketEvents() {
        this.io.on('connection', (socket: Socket) => {
            console.log(`Socket connected: ${socket.id}`);

            socket.on('likes', async (msg: likes) => {
                const request = pool.request()
                const result = await request.query(`INSERT INTO Detalles_Evento (id_evento3, likes, nro_documento_usuario) VALUES (${msg.id_evento}, ${msg.likes}, ${msg.numero_documento})`);
                console.log(result);
                // Aquí puedes implementar la lógica para procesar el mensaje recibido
            });

            socket.on('disconnect', () => {
                console.log(`Socket disconnected: ${socket.id}`);
            });
        });
    }
}