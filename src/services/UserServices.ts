import Users_interface from "../Interfaces/Users_interfaces";
import query from "../database/query";
import {
  NotPasswordIdentify,
  Users_Get_dto,
  Users_dto,
  Users_dto_sub_miembro,
} from "../Dto/Users_dto";
import sql from "mssql";
import pool from "../database/Connection";
import { encryptPass } from "../utils/bcrypt";
import { getTemplate, sendEmail } from "../utils/nodemailer";
import generarCodigoAleatorio from "../utils/codigoRandom";

class user_service implements Users_interface {
  async getUsers(): Promise<Users_Get_dto[] | unknown> {
    try {
      const request = pool.request();
      const result = await request.execute(query.getUsers);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async getUserId(documentNumber: number): Promise<Users_Get_dto[] | unknown> {
    try {
      const request = pool
        .request()
        .input("nro_documento_usuario", sql.BigInt, documentNumber);
      const result = await request.execute(query.getUserId);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserSubMiembroId(id_suborganizacion: number): Promise<Users_dto_sub_miembro[] | unknown> {
    try {
      const request = pool
        .request()
        .input("id_suborganizacion", sql.BigInt, id_suborganizacion);
      const result = await request.execute(query.getUserSubOrgMiembro);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async createUser({
    emailAddress,
    fullName,
    documentNumber,
    documentType,
    password,
    device,
    image_url
  }: Users_dto): Promise<string | unknown> {
    try {
      const newPassword = await encryptPass(password);
      const codigoAleatorio = generarCodigoAleatorio();
      const request = pool
        .request()
        .input("tipo_documento_usuario", sql.VarChar(255), documentType)
        .input("nro_documento_usuario", sql.BigInt, documentNumber)
        .input("nombre_completo_usuario", sql.VarChar(255), fullName)
        .input("correo_usuario", sql.VarChar(255), emailAddress)
        .input("contraseña_usuario", sql.VarChar(2000), newPassword)
        .input("codigo", sql.Int, codigoAleatorio)
        .input("image_url", sql.NVarChar(sql.MAX), image_url);
      await request.execute(query.CreateUsersRegister);
      const template = getTemplate(fullName, codigoAleatorio, device);
      await sendEmail(emailAddress, "Verificación de correo electrónico para El aplicativo TimeCheck", template as string);
      return "Gracias por registrarse!!!";
    } catch (error) {
      throw error;
    }
  }

  async UpdateUsers(
    {
      emailAddress,
      fullName,
      documentType,
      address,
      typeofpopulation,
    }: NotPasswordIdentify,
    documentNumber: number
  ): Promise<string | unknown> {
    try {
      const request = pool
        .request()
        .input("nombre_completo_usuario", fullName)
        .input("tipo_documento_usuario", documentType)
        .input("direccion_usuario", address)
        .input("tipo_poblacion", typeofpopulation)
        .input("correo_usuario", emailAddress)
        .input("nro_documento_usuario", documentNumber);
      await request.execute(query.UpdateUser);
      return "Actualizacion correctamente";
    } catch (error) {
      throw error;
    }
  }

  async deleteUserId(nro_documento_usuario: number): Promise<string | unknown> {
    console.log(nro_documento_usuario);


    try {
      const request = pool
        .request()
        .input("nro_documento_usuario", sql.Int, nro_documento_usuario);
      const result = await request.execute(query.deleteUserId);
      return result.recordset[0].Mensaje;
    } catch (error) {
      throw error;
    }
  }
}

export default user_service;
