import { Socket, Server as WebSocketServer } from "socket.io";
import pool from "../database/Connection";
import querys from "../database/query";
import sql from "mssql";

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
  socket: Socket;
  io: WebSocketServer;

  constructor(socket: Socket, io: WebSocketServer) {
    this.socket = socket;
    this.io = io;
    this.registerListeners();
    // this.io.on("connection", (socket: Socket) => {
    this.socket.on("activo", () => {
      socket.broadcast.emit("activo", true);
    });

    this.socket.on("desactivo", () => {
      socket.broadcast.emit("desactivo", false);
    });
  }

  registerListeners(): void {
    this.socket.on("getComments", this.getComments.bind(this));
    this.socket.on("getCountComments", this.getCountComments.bind(this));
    this.socket.on("addComment", this.addComment.bind(this));
    this.socket.on("deleteComment", this.deleteComment.bind(this));
  }

  async getComments(id_evento4: number) {
    try {
      // Salir de todas las salas actuales
      Object.keys(this.socket.rooms).forEach((room) => {
        this.socket.leave(room);
      });

      // Unirse a una sala basada en una combinación de socket.id y eventoId
      // const sala = `${socket.id}_${eventoId}`;
      this.socket.join(id_evento4.toString());

      const request = pool.request().input("id_evento4", sql.Int, id_evento4);

      const result = await request.execute(querys.getComments);

      this.io.to(id_evento4.toString()).emit("resultComments", result.recordset);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }

  async getCountComments(id_evento4: number) {
    try {
      const request = pool.request().input("idEvento", sql.Int, id_evento4);
      const result = await request.execute(querys.getCountComments);
      this.io.emit("CountComment", result.recordset[0]['']);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }

  async addComment({ id_evento4, comentario, nro_documento_usuario }: CommentPos) {
    try {
      const request = pool
        .request()
        .input("id_evento4", sql.Int, id_evento4)
        .input("comentario", sql.NVarChar(sql.MAX), comentario)
        .input("nro_documento_usuario", sql.VarChar(250), nro_documento_usuario);
      await request.execute(querys.addComments);

      this.getComments(id_evento4)
      this.getCountComments(id_evento4);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }

  async deleteComment({ commentId, id_evento4 }: CommentDelete) {
    try {
      if (commentId === undefined || id_evento4 === undefined) {
        this.socket.emit("error", "client debes mandarme los id para hacer lo que quieres");
        return;
      }
      const request = pool.request().input("ComentarioID", sql.Int, commentId);
      await request.execute(querys.DeleteComents);
      this.getComments(id_evento4);
      this.getCountComments(id_evento4);
      this.socket.emit("delete");
    } catch (error) {
      this.socket.emit("error", error);
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
