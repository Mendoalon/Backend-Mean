const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt')

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
    const salt = bcrypt.genSaltSync(); 
    dbUser.password = bcrypt.hashSync( password, salt ); 

    //Generar el JWT token
    const token = await generarJWT( dbUser.id, name)

    // Crear usuario de DB
    await dbUser.save();


    //Generar respuesta exitosa
    return res.status(200).json({
        ok: true,
        uid: dbUser.id,
        name: name,
        token
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
    const { email, password } = req.body;


    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión, hable con el administrador'

    });

    }


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