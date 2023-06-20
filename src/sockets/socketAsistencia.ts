import { Socket, Server as WebSocketServer } from "socket.io";
import pool from "../database/Connection";
import querys from "../database/query";
import sql from "mssql";

export class Socket_io_Asistencia {
  socket: Socket;
  io: WebSocketServer;
  instance: Socket_io_Asistencia;

  constructor(socket: Socket, io: WebSocketServer) {
    this.socket = socket;
    this.io = io;
    this.instance = this;
    this.registerListeners();
  }

  registerListeners(): void {
    this.socket.on("getAsistencia", this.getAsistencia.bind(this));
    this.socket.on("postAsistencia", this.getAsistencia.bind(this));
    this.socket.on("getCountEvent", this.getCountEvent.bind(this));
    this.socket.on("getCountSubOrg", this.getCountSubOrg.bind(this));
  }


  async getAsistencia(id_evento: number) {
    try {
      const request = pool.request().input("id_evento2", sql.Int, id_evento);
      const result = await request.execute(querys.getAsistencia);
      const recordset = result.recordset[0];

      this.io.emit("Asistencias", recordset);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }


  async getCountEvent(id_organizacion: number) {
    try {
      const request = pool
        .request()
        .input("idOrganizacion", sql.Int, id_organizacion);
      const result = await request.execute(querys.getCountEvent);
      const recordset = result.recordset[0];
      console.log(recordset);

      this.io.emit("CountEvent", recordset);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }


  async getCountSubOrg(id_organizacion: number) {
    console.log(id_organizacion);

    try {
      const request = pool
        .request()
        .input("idOrganizacion", sql.Int, id_organizacion);
      const result = await request.execute(querys.getCountSubOrg);
      const recordset = result.recordset[0];
      console.log(recordset);

      this.io.emit("CountSubOrg", recordset);
    } catch (error) {
      this.socket.emit("error", error);
    }
  }
}
