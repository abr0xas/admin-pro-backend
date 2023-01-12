/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Rutas
router.get( '/', validarJWT, getUsuarios );

//en este post hay 2 tipos de middleware, uno es el check que es propio de express y el validarCampos es nuestro
router.post( '/', 
    [//Creamos middlewares, es el segundo argumento
    //Para hacer validaciones las definimos con el check, y ponemos nuestro middleware validarCampos al final
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario 
);

router.put( '/:id',
    [
        validarJWT, // lo ponemos aquí para que sea lo primero que haga y evide los otros si está mal
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),       
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
    
);

router.delete('/:id',  validarJWT, borrarUsuario );


module.exports = router; 