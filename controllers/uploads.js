const path = require('path')
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen')


const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //Usamos el path importado de node, dirname es la dirección de la aplicación desplegada
    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    //Imagen por defecto
    if( fs.existsSync( pathImg ) ){
         //con sendFile responde express un archivo
        res.sendFile( pathImg );

    } else {
        const pathImg = path.join( __dirname, `../uploads/no-image.jpg` );
        res.sendFile( pathImg );
    }
}

const fileUpload = ( req, res = response ) => {

    const { tipo, id } = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if( !tiposValidos.includes(tipo) ) {
        return res.status( 400 ).json({ 
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        })
    }

    //Validamos que exita un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).joson({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    //Procesar el archivo (imagen)
    const file = req.files.imagen; // tenemos acceso a los files gracias al middleware expressFileUpload en la ruta

    console.log( file );
    const nombreCortado = file.name.split('.'); // nombreImagen.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ]

    //Validar extensio
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({ 
            ok: false,
            msg: 'No es una extensión permitida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar la imagen, no se suele o debe almacenar los archivos el servidor propiamente,
    //se suele usar servicios de terceros como claudinary o un backdend dedicado al manejo de imagenes,
    //ya que permitir esto sería abrir la puerta de seguridad, almacenar una imagen que no sea una imagen, sino un virus o similar
    const path = `./uploads/${ tipo }/${ nombreArchivo }`

    //Mover la imagen
    // Use the mv() method to place the file somewhere on your server
    file.mv( path, (err) => {
        if (err) {
            console.log( err );
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
        });

    }
    //Actualizar base de datos
    actualizarImagen( tipo, id, nombreArchivo );

    res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}


module.exports = {
    fileUpload,
    retornaImagen
}