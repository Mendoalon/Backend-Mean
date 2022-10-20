const { response } = require('express');
const Usuario = require('../models/Usuario')

//Funcion crear usuario
const crearUsuario = async(req, res = response )=>{

    const { email, name, password } = req.body;

    try {
    //Verficar el email que no exista
    const usuario = await Usuario.findOne({ email: email });
       if(usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        })
       } 

    //Crear usuario con el modelo.
    const dbUser = new Usuario( req.body);   

    //Hashear la contraseña (encryptar)


    //Generar el JWT token

    // Crear usuario de DB
    await dbUser.save();


    //Generar respuesta exitosa
    return res.status(200).json({
        ok: true,
        uid: dbUser.id,
        name: name,
       
    });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Crear usuario /new'
        });
    }
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