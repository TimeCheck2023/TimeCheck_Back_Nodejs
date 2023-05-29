//importo la configuracion del module que permite utilizar las variables de entorno
import 'dotenv/config'

//creo un objeto que tendra todas las variables de entorno del sistema
export default {
    SQL_DATABASE : process.env.DATABASE,
    SQL_USER : process.env.USER,
    SQL_PASSWORD : process.env.PASSWORD,
    SQL_SERVER : process.env.SERVER,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.SECRETJWT,
    USEREMAIL : process.env.USEREMAIL,
    PASSEMAIL: process.env.PASSEMAIL
}