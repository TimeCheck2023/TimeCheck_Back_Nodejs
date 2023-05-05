import sql from "mssql";
import config from '../config'

// configuracion de la conexion a sql server
const configOptions = {
  user: config.SQL_USER,
  password: config.SQL_PASSWORD,
  server: config.SQL_SERVER,
  database: config.SQL_DATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

//ConnectionPool instancia es un grupo separado de conexiones se adquiere una nueva conexión TDS del grupo y se reserva para la acción deseada. 
// Una vez que se completa la acción, la conexión se libera de nuevo al grup
const pool = new sql.ConnectionPool(configOptions);


// validacion la conexion para saber si se conecto o no
pool.connect().then(() => {
  console.log('Conexión a SQL Server establecida correctamente.');
}).catch(err => {
    console.error('Error al conectar a SQL Server:', err.message);
   if (!pool.connected) {
    console.log('La conexión está cerrada');
   } 

});



export default pool;