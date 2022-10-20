const express = require('express');

//Crear el servidor/aplicaicon de express
const app = express();



//Rutas 
app.use( '/api/auth', require('./routes/auth' ))


app.listen( 4000, ()=>{
    console.log('Express server running on port 4000');
})