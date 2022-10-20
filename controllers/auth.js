const { response } = require('express');


//Funcion crear usuario
const crearUsuario = (req, res = response )=>{

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });

}

//Funcion login de usuario
const loginUsuario = (req, res = response)=>{

    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });

}

//Funcion para validar token.
const revalidarToken =  (req, res = response)=>{

    return res.json({
        ok: true,
        msg: 'Renew'
    });

}

//Exportamos la funciones creadas.
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

};