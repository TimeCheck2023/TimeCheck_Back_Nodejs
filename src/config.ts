//importo la configuracion del module que permite utilizar las variables de entorno
import 'dotenv/config'

//creo un objeto que tendra todas las variables de entorno del sistema
export default {
    SQL_DATABASE : 'timecheck',
    SQL_USER : 'Osorio3408_SQLLogin_1',
    SQL_PASSWORD : 'ps9tktjhs5',
    SQL_SERVER : 'timecheck.mssql.somee.com',
    PORT : process.env.PORT,
    JWT_SECRET : process.env.SECRETJWT
}