const express = require('express');
const cors = require('cors');
require('dotenv').config();


//Crear el servidor/aplicaicon de express
const app = express();


//Directorio Publico
app.use(express.static('public') );


//CORS
app.use( cors( ) );


//Lectura y parseo del body
app.use( express.json() );



//Rutas 
app.use( '/api/auth', require('./routes/auth' ) );


app.listen( 4000, ()=>{
    console.log(`Express server running on port: ${process.env.PORT} `);
})