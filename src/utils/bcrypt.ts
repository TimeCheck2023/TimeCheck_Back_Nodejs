import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

interface tokenData {
  correo: string;
  nro_documento_usuario: string;
  contraseña: string;
  EsUsuario: number;
}

export const encryptPass = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const macthPass = async (
  password: string,
  savePassword: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, savePassword);
};



export const CreateToken = async (payload: tokenData) => {
  payload.contraseña = 'te engañe raton'
  // exp: Math.floor(Date.now() / 1000) + (60 * 60) // valido de un dia
  //  // creamos el token con jwt con una expiracion, los datos y la palabra secreta
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // valido hasta 30
      payload,
    },
    config.JWT_SECRET as string
  );

  return token;
};
