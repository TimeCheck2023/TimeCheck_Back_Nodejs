const app = require('./app')

// configuramos el numero del puerto
const PORT  = process.env.PORT || 3000


// iniciamos el servidor 
app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
})