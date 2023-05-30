import { Server, Socket } from 'socket.io';
import pool from '../database/Connection';
import querys from '../database/query';
import sql from 'mssql'

interface CommentPos {
    id_evento4: number;
    comentario: string;
    nro_documento_usuario: number;
}

interface CommentGet extends CommentPos {
    id_comentario: number;
    nombre_completo_usuario: string;
    correo_usuario: string;
}


export class Socket_io {
    io: Server;
    instance: Socket_io;

    constructor(io: Server) {
        this.io = io;
        this.instance = this;
        this.io.on('connection', (socket: Socket) => {
            console.log(`Socket connected: ${socket.id}`);

            socket.on('getComments', (id_evento4: number) => {
                this.getComments(socket, id_evento4)
            })
            socket.on('addComment', (comment: CommentPos) => {
                console.log(comment);

                this.addComment(socket, comment)
            })
            // socket.on('deleteComment', (commentId: number) =>{
            //     this.getComments(socket)
            // })
        })
    }

    async getComments(socket: Socket, id_evento4: number) {
        try {
            const request = pool.request()
                .input('id_evento4', sql.Int, id_evento4)
            const result = await request.execute(querys.getComments)
            socket.emit('resultComments', result.recordset)
            console.log(result.recordset);
        } catch (error) {

        }
    }

    async addComment(socket: Socket, { id_evento4, comentario, nro_documento_usuario }: CommentPos) {
        const request = pool.request()
            .input('id_evento4', sql.Int, id_evento4)
            .input('comentario', sql.VarChar(250), comentario)
            .input('nro_documento_usuario', sql.VarChar(250), nro_documento_usuario)
        const result = await request.execute(querys.addComments);
        console.log(result);
        this.instance.getComments(socket, id_evento4);
    }

    deleteComment() {
    }

    // configureSocketEvents() {
    //     this.io.on('connection', (socket: Socket) => {
    //         console.log(`Socket connected: ${socket.id}`);

    //         socket.on('likes', async (msg: likes) => {
    //             const request = pool.request()
    //             const result = await request.query(`INSERT INTO Detalles_Evento (id_evento3, likes, nro_documento_usuario) VALUES (${msg.id_evento}, ${msg.likes}, ${msg.numero_documento})`);
    //             console.log(result);
    //             // Aquí puedes implementar la lógica para procesar el mensaje recibido
    //         });

    //         socket.on('disconnect', () => {
    //             console.log(`Socket disconnected: ${socket.id}`);
    //         });
    //     });
    // }
}