import sql from "mssql";
import { Users_dto } from "../Dto/Users_dto";
import Users_interface from "../Interfaces/users_interfaces";
import pool from "../database/Connection";
// const query = require('../database/query')


class user_service implements Users_interface {
    async createUser({ emailAdress, fullName, address, documentNumber, documentType, password }: Users_dto): Promise<Users_dto | string> {
        // const registerNewUser = pool.request()
        //     .input("cedula", sql.BigInt, tipo_cuenta)
        //     .input("tipo_doc", sql.VarChar(2), name)
        //     .input("nombre_usuario", sql.VarChar(50), adress)
        //     .input("direccion_residencia", sql.VarChar(50), phone)
        //     .input("email", sql.VarChar(50), email)
        //     .input("contraseña", sql.VarChar(2000), password)
        //     .execute(query.CreateUsersRegister)
        return { emailAdress, fullName, address, documentNumber, documentType, password };
    }

}


export default user_service;