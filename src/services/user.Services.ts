import sql from "mssql";
import { Users_dto } from "../Dto/Users_dto";
import Users_interface from "../Interfaces/users_interfaces";
import pool from "../database/Connection";
import query from "../database/query";

class user_service implements Users_interface {
  async createUser({ emailAddress, fullName, documentNumber, documentType, password }: Users_dto): Promise<string> {
    console.log("bueno del servicio");
    try {
      const request = pool.request()
        .input("tipo_documento_usuario", sql.VarChar(255), documentType)
        .input("nro_documento_usuario", sql.BigInt, documentNumber)
        .input("nombre_completo_usuario", sql.VarChar(255), fullName)
        .input("correo_usuario", sql.VarChar(255), emailAddress)
        .input("contraseña_usuario", sql.VarChar(2000), password)
      const result = await request.execute(query.CreateUsersRegister);      
      return 'hoola';
    } catch (error) {
      console.log("error del servicio");
      throw error
    }
  }

}


export default user_service;