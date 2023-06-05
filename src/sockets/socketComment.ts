import { Server, Socket } from 'socket.io';
import pool from '../database/Connection';
import querys from '../database/query';
import sql from 'mssql'

interface CommentPos {
    id_evento4: number;
    comentario: string;
    nro_documento_usuario: number;
}
interface CommentDelete {
    id_evento4: number;
    commentId: number;
}

interface CommentGet extends CommentPos {
    id_comentario: number;
    nombre_completo_usuario: string;
    correo_usuario: string;
}


export class Socket_io_Comment {
    io: Server;
    instance: Socket_io_Comment;

    constructor(io: Server) {
        this.io = io;
        this.instance = this;
        this.io.on('connection', (socket: Socket) => {
            console.log(`Socket connected: ${socket.id}`);

            socket.on('typing', () => {
                this.io.emit('typing', true);
            })

            socket.on('getComments', (id_evento4: number) => {
                this.getComments(socket, id_evento4)
            })
            socket.on('addComment', (comment: CommentPos) => {
                this.addComment(socket, comment)
            })
            socket.on('deleteComment', (commentId: CommentDelete) => {
                this.deleteComment(socket, commentId)
            })
        })
    }

    async getComments(socket: Socket, id_evento4: number) {
        try {
            const request = pool.request()
                .input('id_evento4', sql.Int, id_evento4)
            const result = await request.execute(querys.getComments)
            this.io.emit('resultComments', result.recordset)
        } catch (error) {
            socket.emit('error', error);
        }
    }

    async addComment(socket: Socket, { id_evento4, comentario, nro_documento_usuario }: CommentPos) {
        try {
            const request = pool.request()
                .input('id_evento4', sql.Int, id_evento4)
                .input('comentario', sql.NVarChar(sql.MAX), comentario)
                .input('nro_documento_usuario', sql.VarChar(250), nro_documento_usuario)
            await request.execute(querys.addComments);
            this.instance.getComments(socket, id_evento4);
        } catch (error) {
            socket.emit('error', error);
        }
    }

    async deleteComment(socket: Socket, { commentId, id_evento4 }: CommentDelete) {
        try {
            if (commentId === undefined || id_evento4 === undefined) {
                socket.emit('error', 'client debes mandarme los id para hacer lo que quieres');
                return;
            }
            const request = pool.request()
                .input('ComentarioID', sql.Int, commentId)
            await request.execute(querys.DeleteComents)
            this.instance.getComments(socket, id_evento4);
            socket.emit('delete')
        } catch (error) {
            socket.emit('error', error);
        }
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