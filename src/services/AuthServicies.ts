import sql from "mssql";
import { Auth_dto } from "../Dto/Auth_dto";
import pool from "../database/Connection";
import query from "../database/query";
import { CreateToken, macthPass } from "../utils/bcrypt";

class Auth_service {
    async authUser({ emailAddress, password }: Auth_dto): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input("correo_usu_org", sql.VarChar(255), emailAddress)
            const responde = await request.execute(query.VeryUsersLogin)
            if (!await macthPass(password, responde.recordset[0].contraseña)) throw new Error("usuario o contraseña incorrect");
            const correo = responde.recordset[0].correo;
            const EsUsuario = responde.recordset[0].EsUsuario 
            const token = await CreateToken(correo, EsUsuario)
            const data = {
                token,
                correo, 
                EsUsuario
            }
            return data;
        } catch (error) {
            throw error
        }
    }

}


export default Auth_service;