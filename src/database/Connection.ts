import sql, { connect } from "mssql";
import config from '../config'

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

const pool = new sql.ConnectionPool(configOptions);


pool.connect().then(() => {
  console.log('Conexión a SQL Server establecida correctamente.');
}).catch(err => {
    console.error('Error al conectar a SQL Server:', err.message);
   if (!pool.connected) {
    console.log('La conexión está cerrada');
   } 

});



export default pool;