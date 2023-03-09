const sql = require('mssql')

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

// Por otro lado, ConnectionPool administra una agrupación de conexiones a la base de datos.
// En lugar de abrir y cerrar una conexión cada vez que se necesita interactuar con la base de datos,
//  ConnectionPool mantiene una agrupación de conexiones disponibles para su uso.
const pool = new sql.ConnectionPool(config);

pool.connect().then(() => {
  console.log('Conexión a SQL Server establecida correctamente.');
}).catch(err => {
  if (err.code === 'ECONNRESET') {
    console.log('Se perdió la conexión con el servidor');
  } else {
    console.error('Error al conectar a SQL Server:', err.message);
  }
});

module.exports = pool;