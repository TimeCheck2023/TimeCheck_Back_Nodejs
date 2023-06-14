import { Server, Socket } from "socket.io";
import pool from "../database/Connection";
import querys from "../database/query";
import sql from "mssql";


export class Socket_io_Asistencia {
    io: Server;
    instance: Socket_io_Asistencia;

    constructor(io: Server) {
        this.io = io;
        this.instance = this;
        this.io.on("connection", (socket: Socket) => {
            socket.on("getAsistencia", (id_evento: number) => {
                this.getAsistencia(socket, id_evento);
            });
            socket.on("postAsistencia", (id_evento: number) => {
                this.getAsistencia(socket, id_evento);
            });
            socket.on("getCountEvent", (id_organizacion: number) => {
                this.getCountEvent(socket, id_organizacion);
            });
            socket.on("getCountSubOrg", (id_organizacion: number) => {
                this.getCountSubOrg(socket, id_organizacion);
            });
        });



    }
    async getAsistencia(socket: Socket, id_evento: number) {
        console.log(id_evento);

        try {
            const request = pool
                .request()
                .input(
                    "id_evento2",
                    sql.Int,
                    id_evento
                );
            const result = await request.execute(querys.getAsistencia);
            const recordset = result.recordset[0];

            this.io.emit("Asistencias", recordset);
        } catch (error) {
            socket.emit("error", error);
        }
    }
    async getCountEvent(socket: Socket, id_organizacion: number) {
        console.log(id_organizacion);

        try {
            const request = pool
                .request()
                .input(
                    "idOrganizacion",
                    sql.Int,
                    id_organizacion
                );
            const result = await request.execute(querys.getCountEvent);
            const recordset = result.recordset[0];
            console.log(recordset);
            

            this.io.emit("CountEvent", recordset);
        } catch (error) {
            socket.emit("error", error);
        }
    }
    async getCountSubOrg(socket: Socket, id_organizacion: number) {
        console.log(id_organizacion);

        try {
            const request = pool
                .request()
                .input(
                    "idOrganizacion",
                    sql.Int,
                    id_organizacion
                );
            const result = await request.execute(querys.getCountSubOrg);
            const recordset = result.recordset[0];
            console.log(recordset);
            

            this.io.emit("CountSubOrg", recordset);
        } catch (error) {
            socket.emit("error", error);
        }
    }


}