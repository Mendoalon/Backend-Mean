const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log( process.env );
//Crear el servidor/aplicaicon de express
const app = express();


//CORS
app.use( cors( ) );


//Lectura y parseo del body
app.use( express.json() );



//Rutas 
app.use( '/api/auth', require('./routes/auth' ) );


app.listen( 4000, ()=>{
    console.log(`Express server running on port: ${process.env.PORT} `);
})