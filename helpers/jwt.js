const jwt = require('jsonwebtoken');

//necesito que esta función actué como síncrona cuando la utilicemos en el controlador, por esto
//retornaremos una promesa, y podremos usar el async await
const generarJWT = ( uid ) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if( err ) {
                console.log( err );
                reject('No se pudo generar el JWT')
            } else {
                resolve( token );
            }
    
        });

    })

    /*
    Para generar un token necesitamos una palabra secreta que nadie debe saber, porq con ella se firma.
    Instalamos jsonwebtoken

    */

}

module.exports = {
    generarJWT,
}