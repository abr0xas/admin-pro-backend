const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response, next) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne( { email });

        if( !usuarioDB ) {
            return res.status(404).json({ 
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

//12 goolge sign in
const googleSignIn = async ( req, res= response ) => {

    try {
    
        //const googleUser = await googleVerify(req.body.token);
        //Google nos provee todos los datos: email, nombre, foto del perfil
        const {email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });

        console.log('por aquí');
        let usuario;

        if( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token de Google no es correcto'
        })
        
    }

}

const renewToken = async( req, res = respuesta ) => {



    const uid = req.uid;

    //Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    console.log(token);

    res.json({
        ok: true,
        uid,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}