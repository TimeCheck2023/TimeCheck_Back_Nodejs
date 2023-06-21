import sql from "mssql";
import { Auth_dto, Password_dto } from "../Dto/Auth_dto";
import pool from "../database/Connection";
import query from "../database/query";
import { CreateToken, encryptPass, macthPass } from "../utils/bcrypt";
import { sendEmail, getTemplateEmail } from "../utils/nodemailer";
import generarCodigoAleatorio from "../utils/codigoRandom";


class Auth_service {
    async authUser({ emailAddress, password }: Auth_dto): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input("correo_usu_org", sql.VarChar(255), emailAddress)
            const responde = await request.execute(query.VeryUsersLogin)
            if (!await macthPass(password, responde.recordset[0].contraseña)) throw new Error("usuario o contraseña incorrecto");
            const token = await CreateToken(responde.recordset[0])
            return token;
        } catch (error) {
            throw error
        }
    }
    async verificacionUser(codigo: number): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input("codigo", sql.Int, codigo)
            const responde = await request.execute(query.VerificarEmail)
            return responde;
        } catch (error) {
            throw error
        }
    }
    async verificacionEmails(Email: string): Promise<string | unknown> {
        try {
            const codigoAleatorio = generarCodigoAleatorio();
            const request = pool.request().input("Email", sql.VarChar(100), Email)
            const responde = await request.execute(query.RecuperacionEmail)
            const template: string = getTemplateEmail(Email, codigoAleatorio)
            sendEmail(Email, 'Solicitud de código de recuperación de contraseña', template)
            responde.recordset[0].codigo = codigoAleatorio
            return responde.recordset[0];
        } catch (error) {
            throw error
        }
    }

    async CambioPassword({ password, nro_documento_usuario }: Password_dto): Promise<string | unknown> {
        try {
            const newPassword = await encryptPass(password);
            const request = pool.request()
                .input("id", sql.Int, nro_documento_usuario)
                .input("password", sql.VarChar(2000), newPassword)
            const responde = await request.execute(query.cambioPassword)
            return responde.recordset[0];
        } catch (error) {
            throw error
        }
    }

}


export default Auth_service;