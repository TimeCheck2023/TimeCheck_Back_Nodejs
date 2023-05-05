import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const encryptPass = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

export const macthPass = async (password: string, savePassword: string): Promise<Boolean> => {
  return await bcrypt.compare(password, savePassword)
}

// const CreateToken = async(payload) =>{
//      //  // creamos el token con jwt con una expiracion, los datos y la palabra secreta
//      const token = jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // valido hasta 30
//         payload
//      }, 'secret')

//      return token

// }
