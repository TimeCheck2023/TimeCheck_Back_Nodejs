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
    // this.socket.on('')
    this.registerListeners();
  }

  registerListeners(): void {
    this.socket.on("getAsistencia", this.getAsistencia.bind(this));
    this.socket.on("getCountEvent", this.getCountEvent.bind(this));
    this.socket.on("getCountSubOrg", this.getCountSubOrg.bind(this));
  }

  async getAsistencia(id_evento: number) {
    try {
      
      // Unirse a una sala basada en el eventoId
      this.socket.join(id_evento.toString());

      const request = pool.request().input("id_evento2", sql.Int, id_evento);
      const result = await request.execute(querys.getAsistencia);
      const recordset = result.recordset[0];

      recordset.id_evento = id_evento
      
      
      this.io.to(id_evento.toString()).emit("Asistencias", recordset);
    } catch (error) {
      this.io.to(id_evento.toString()).emit("error", error);
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
