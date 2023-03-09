const pool = require('../database/Connection')
const sql = require('mssql')
const query = require('../database/query')
const { encryptPass, macthPass, CreateToken} = require('../helpers/bcrypt')

class user_service {

   async createUsers(data) {
      const contraseña_hash = await encryptPass(data.password)
      const nuevadata = {
         ...data,
         password: contraseña_hash
      }
      const register = await pool.request()
         .input("cedula", sql.BigInt, nuevadata.cedula)
         .input("tipo_doc", sql.VarChar(2), nuevadata.documentType)
         .input("nombre_usuario", sql.VarChar(50), nuevadata.name)
         .input("direccion_residencia", sql.VarChar(50), nuevadata.address)
         .input("email", sql.VarChar(50), nuevadata.email)
         .input("contraseña", sql.VarChar(2000), nuevadata.password)
         .execute(query.CreateUsersRegister)
      if (register.recordset) {
         throw new Error(register.recordset[0]['']);
      }
      return register
   }
   
   async VeryUsers(data) {
      const VeryUser = await pool.request()
         .input("email", sql.VarChar(50), data.email)
         .execute(query.VeryUsersLogin)
         if (VeryUser.recordset[0][''] === 0 || !await macthPass(data.password, VeryUser.recordset[0].contraseña)) {
         throw new Error("usuario o contraseña incorrecta");
      }else{
            const payload = {
               cedula: VeryUser.recordset[0].cedula,
               nombre: VeryUser.recordset[0].nombre_usuario,
               email: VeryUser.recordset[0].email
             };
             const TokenCreado = await CreateToken(payload)
            return TokenCreado
      }
   }
}

module.exports = user_service;