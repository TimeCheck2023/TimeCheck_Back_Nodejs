const express = require('express');
require('dotenv').config()
require('./database/Connection')
const indexroutes = require('./routes/index')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');


//aca iniciamos express
const app = express();

// permitimos recibir datos por el cuerpo
app.use(express.json());
app.use(cookieParser());


// permite dar un registro de las peticiones del cliente
app.use(morgan('dev'))


// la opción origin se establece en true, lo que significa que se permiten solicitudes CORS desde cualquier origen.
// La opción credentials también se establece en true, lo que permite enviar credenciales como cookies o encabezados de autenticación) en solicitudes CORS.
app.use(
    cors(
        {
            origin: true,
            credentials: true,
        }
    )
);


app.use('/api/v1', indexroutes)

// configuramos el numero del puerto
const PORT  = process.env.PORT || 3000


// iniciamos el servidor 
app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
})