import sql from "mssql";
import { Users_dto } from "../Dto/Users_dto";
import Users_interface from "../Interfaces/users_interfaces";
import pool from "../database/Connection";
import query from "../database/query";
import { encryptPass } from "../utils/bcrypt";

class user_service implements Users_interface {
  async createUser({ emailAddress, fullName, documentNumber, documentType, password }: Users_dto): Promise<string | unknown> {
    try {

      const newPassword = await encryptPass(password)
      const request = pool.request()
        .input("tipo_documento_usuario", sql.VarChar(255), documentType)
        .input("nro_documento_usuario", sql.BigInt, documentNumber)
        .input("nombre_completo_usuario", sql.VarChar(255), fullName)
        .input("correo_usuario", sql.VarChar(255), emailAddress)
        .input("contraseña_usuario", sql.VarChar(2000), newPassword)
      await request.execute(query.CreateUsersRegister);
      return 'Gracias por registrarse';
    } catch (error) {
      throw error
    }
  }

}


export default user_service;