import { Server, Socket } from "socket.io";
import pool from "../database/Connection";
import querys from "../database/query";
import sql from "mssql";

interface LikesPos {
  id_evento: number;
  likes: number;
  nro_documento_usuario: number;
}

interface LikesDelete {
  nro_documento_usuario: number;
  id_evento: number;
}

export class Socket_io_Likes {

  io: Server;
  instance: Socket_io_Likes;



  constructor(io: Server) {
    this.io = io;
    this.instance = this;
    this.io.on("connection", (socket: Socket) => {
      socket.on("getLikes", (nro_documento_usuario: number) => {
        this.getLikes(socket, nro_documento_usuario);
      });
      socket.on("getCountLikes", (id_evento5: number) => {
        this.getCountLikes(socket, id_evento5);
      });
      socket.on("createLikes", (likes: LikesPos) => {
        this.createLikes(socket, likes);
      });
      socket.on("deleteLikes", (likes: LikesDelete) => {
        this.deleteLikes(socket, likes);
      });
    });
  }

  async getLikes(socket: Socket, nro_documento_usuario: number) {
    try {
      const request = pool
        .request()
        .input(
          "nro_documento_usuario3",
          sql.VarChar(250),
          nro_documento_usuario
        );
      const result = await request.execute(querys.getLikes);
      this.io.emit("likes", result.recordset);
    } catch (error) {
      socket.emit("error", error);
    }
  }
  async getCountLikes(socket: Socket, id_evento5: number) {
    try {
      const request = pool
        .request()
        .input(
          "idEvento",
          sql.Int,
          id_evento5
        );
      const result = await request.execute(querys.getCountLikes);
      console.log(result.recordset[0]['']);
      console.log(result.recordsets[0]);
      
      this.io.emit("Countlikes", result.recordset);
    } catch (error) {
      socket.emit("error", error);
    }
  }

  async createLikes(
    socket: Socket,
    { id_evento, likes, nro_documento_usuario }: LikesPos
  ) {
    console.log(nro_documento_usuario);
    try {
      const request = pool
        .request()
        .input("id_evento5", sql.Int, id_evento)
        .input("like", sql.Int, likes)
        .input(
          "nro_documento_usuario3",
          sql.VarChar(250),
          nro_documento_usuario
        );
      await request.execute(querys.addLikes);
      this.instance.getLikes(socket, nro_documento_usuario);
      this.instance.getCountLikes(socket, id_evento);
    } catch (error) {
      socket.emit("error", error);
    }
  }

  async deleteLikes(
    socket: Socket,
    { id_evento, nro_documento_usuario }: LikesDelete
  ) {
    try {
      const request = pool.request()
        .input(
          "nro_documento_usuario3",
          sql.VarChar(250),
          nro_documento_usuario
        );
      await request.execute(querys.deleteLikes);
      this.instance.getLikes(socket, nro_documento_usuario);
      this.instance.getCountLikes(socket, id_evento);
    } catch (error) {
      socket.emit("error", error);
    }
  }
}
