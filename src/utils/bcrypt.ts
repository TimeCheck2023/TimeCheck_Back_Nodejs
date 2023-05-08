import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export const encryptPass = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

export const macthPass = async (password: string, savePassword: string): Promise<Boolean> => {
  return await bcrypt.compare(password, savePassword)
}

export const CreateToken = async (correo: string, esUsuario: number) => {
  const payload = { esUsuario, correo };
  // exp: Math.floor(Date.now() / 1000) + (60 * 60) // valido de un dia
  //  // creamos el token con jwt con una expiracion, los datos y la palabra secreta
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // valido hasta 30
    payload
  }, config.JWT_SECRET as string);

  return token

}
