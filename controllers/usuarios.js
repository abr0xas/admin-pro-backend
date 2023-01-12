const { response } = require('express')
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');



const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre role email google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid //compartimos el uid del usuario que hizo la petición, esto lo configuramos en el middleware
    });
}

//Si al crear usuario no viene la res, pongo el valor por defecto response
const crearUsuario = async(req, res = response ) => {

    const {  password, email } = req.body;
    

    try {
        const exiteEmail = await Usuario.findOne({ email });

        if ( exiteEmail ) {
            return res.status(400).json({ 
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //Genera data de manera aleatoria, el sync es síncrono
        usuario.password = bcrypt.hashSync( password, salt );//Encripto la contraseña y mando la data aleatoria ( no se muy bien porq esta data aleatoria)
        
        //el save es una promesa, por lo que tenemos que seperar a que termine, por eso el await, y por eso la hacemos async
        await usuario.save();

        //Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
        //res.json solo puede aparecer 1 vez en el bloque del código
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Error inesperado... revisar logs'
         });
    }

   

}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({ 
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        //Actualizaciones
        //aquí en campos se guardan los datos del body excepto los que hemos desestructurado (password, google, email)
        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });
         
        res.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg: 'Error inesperado... revisar logs'
         });
    }

}

const borrarUsuario = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        console.log('Dentro borrar usuario');

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            res.json({
                ok: false,
                msg: `No existe usuario por ese id`
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: `Usuario eliminado`,
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg: 'Error inesperado... revisar logs'
         });
    }

}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}