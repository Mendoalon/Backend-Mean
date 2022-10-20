const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


//Crear el servidor/aplicaicon de express
const app = express();

//Conexion a la base de datos.
dbConnection();


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