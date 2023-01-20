/*
api/uploads
*/

const { Router } = require('express');

const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

//esto es un middleware de la librería de express-fileupload, lo podemos ejecutar con router en lugar
// que con app
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload)
router.get('/:tipo/:foto', validarJWT, retornaImagen)

 
module.exports = router;