const jwt = require('jsonwebtoken');



const validarJWT = (req, res, next) => {

    //leer Token
    const token = req.header('x-token');
    console.log( token );
    if( !token ) {
        return res.status( 401 ).json({ 
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        //Verifica con nuestra firma, si hace match con nuestra firma continúa, sino va al catch
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );        
        //pasamos datos del token a los controllers
        req.uid = uid;

        next();
        
    } catch (error) {

        res.status(401).json({ 
            ok: false, 
            msg: 'Token no válido'})
        
    }


   

}


module.exports = {
    validarJWT
}