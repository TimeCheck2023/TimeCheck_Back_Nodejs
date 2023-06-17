import { Socket, Server as WebSocketServer } from "socket.io";
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
interface LikeDetails {
  id_evento5: number;
  nroDocumentoUsuario3: string;
}

interface CombinedResult {
  countLikes: number;
  likesDetails: LikeDetails[];
}

export class Socket_io_Likes {
  socket: Socket;
  io: WebSocketServer;
  instance: Socket_io_Likes;

  constructor(socket: Socket, io: WebSocketServer) {
    this.socket = socket;
    this.io = io;
    this.instance = this;
    this.registerListeners();
  }

  registerListeners(): void {
    this.socket.on("getLikes", this.getLikes.bind(this));
    this.socket.on("getCountLikes", this.getCountLikes.bind(this));
    this.socket.on("createLikes", this.createLikes.bind(this));
    this.socket.on("deleteLikes", this.deleteLikes.bind(this));
  }

  async getLikes(nro_documento_usuario: number) {
    console.log(nro_documento_usuario);
    try {
      const request = pool.request()
        .input("nro_documento_usuario3", sql.VarChar(250), nro_documento_usuario);
      const result = await request.execute(querys.getLikes);
      this.io.emit("likes", result.recordset);
    } catch (error) {
      console.log(error);
      this.socket.emit("error", error);
    }
  }

  async getCountLikes(id_evento5: number) {
    try {
      const request = pool.request().input("idEvento", sql.Int, id_evento5);
      const result = await request.execute(querys.getCountLikes);
      const recordsets = result.recordsets as any;
      const countLikes = recordsets[0][0].LikesCount as number; // Obtén el resultado del primer SELECT
      const likesDetails = recordsets[1] as LikeDetails[]; // Obtén los resultados del segundo SELECT

      const combinedResult: CombinedResult = {
        countLikes,
        likesDetails: likesDetails.map((row) => ({
          id_evento5: row.id_evento5,
          nroDocumentoUsuario3: row.nroDocumentoUsuario3,
        })),
      };

      this.io.emit("Countlikes", combinedResult);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }

  async createLikes({ id_evento, likes, nro_documento_usuario }: LikesPos) {
    console.log(nro_documento_usuario);
    try {
      const request = pool.request()
        .input("id_evento5", sql.Int, id_evento)
        .input("like", sql.Int, likes)
        .input("nro_documento_usuario3", sql.VarChar(250), nro_documento_usuario);
      await request.execute(querys.addLikes);
      this.instance.getLikes(nro_documento_usuario);
      this.instance.getCountLikes(id_evento);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }

  async deleteLikes({ id_evento, nro_documento_usuario }: LikesDelete) {
    console.log(nro_documento_usuario);
    try {
      const request = pool
        .request()
        .input("nro_documento_usuario3", sql.VarChar(250), nro_documento_usuario)
        .input("id_evento", sql.Int, id_evento);
      await request.execute(querys.deleteLikes);
      this.instance.getLikes(nro_documento_usuario);
      this.instance.getCountLikes(id_evento);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }
}
