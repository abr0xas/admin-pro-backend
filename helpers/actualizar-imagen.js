const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {

    //fs es un modulo de node que nos permite trabajar con los archivos de los directorio
    //comprobar si existen, borrar... etc.
    if( fs.existsSync ( path ) ) {
        // borrar la imagen anteior
        fs.unlinkSync( path );
    }

}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let path = "";

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if( !medico ) {
                console.log('No se encontró médico por id');
                return false;
            }

            path = `./uploads/medicos/${ medico.img }`
            borrarImagen( path );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
            break;
    
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if( !hospital ) {
                console.log('No se encontró hospital por id');
                return false;
            }

            path = `./uploads/hospitales/${ hospital.img }`
            borrarImagen( path );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
            break;
    
        case 'usuarios':
            console.log('dentro case usuarios');
            const usuario = await Usuario.findById( id );
            if( !usuario ) {
                console.log('No se encontró usuario por id');
                return false;
            }

            path = `./uploads/usuarios/${ usuario.img }`
            borrarImagen( path );

            usuario.img = nombreArchivo;
            console.log(usuario);
            await usuario.save();
            return true;
            
            break;
    
        default:
            break;
    }
    


}


module.exports = {
    actualizarImagen
}