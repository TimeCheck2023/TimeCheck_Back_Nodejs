import sql from "mssql";
import { Auth_dto } from "../Dto/Auth_dto";
import pool from "../database/Connection";
import query from "../database/query";
import { CreateToken, macthPass } from "../utils/bcrypt";

class Auth_service {
    async authUser({ emailAddress, password }: Auth_dto): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input("correo_usuario", sql.VarChar(255), emailAddress)
            const responde = await request.execute(query.VeryUsersLogin)
            if (responde.recordset[0][''] === 0 || !await macthPass(password, responde.recordset[0].contraseña_usuario)) {
                throw new Error("usuario o contraseña incorrecta");
            }
            const token = await CreateToken(responde.recordset[0].correo_usuario)
            return token;
        } catch (error) {
            throw error
        }
    }

}


export default Auth_service;