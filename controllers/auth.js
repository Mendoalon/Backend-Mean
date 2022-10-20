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
const loginUsuario = async(req, res = response)=>{
    const { email, password } = req.body;


    try {

        const dbUser = await Usuario.findOne({ email: email});

        //Confirma si el correo existe
        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            }) 
        }

        //Confirma si el password hace match si es igual.
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            }); 
        }
        
        //Genera el JWT ya que hasta este punto el usuario y correo.
        //Generar el JWT token
        const token = await generarJWT( dbUser.id, dbUser.name);
        
        //Respuesta del  servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión, hable con el administrador'
    });

    }


}

//Funcion para validar token.
const revalidarToken =  async(req, res = response)=>{

    const { uid, name } = req;

    //Generar el JWT token
   

    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    });

}

//Exportamos la funciones creadas.
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

};