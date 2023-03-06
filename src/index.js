const express = require('express');
require('dotenv').config()
require('./database/Connection')
const indexroutes = require('./routes/index')
const morgan = require('morgan')
const cors = require('cors')

//aca iniciamos express
const app = express();

// permitimos recibir datos por el cuerpo
app.use(express.json());

// permite dar un registro de las peticiones del cliente
app.use(morgan('dev'))

app.use(cors())


app.use('/api/v1', indexroutes)

// configuramos el numero del puerto
const PORT  = process.env.PORT || 3000


// iniciamos el servidor 
app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
})