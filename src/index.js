const express = require('express');
require('dotenv').config()
require('./database/Connection')
const indexroutes = require('./routes/index')
const morgan = require('morgan')
const cors = require('cors')

//aca iniciamos express
const app = express();

app.use(express.json());

app.use(morgan('dev'))
app.use(cors())


app.use('/api/v1', indexroutes)

const PORT  = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
})