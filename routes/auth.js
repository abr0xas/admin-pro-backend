// Path: 'api/login'


const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
[
    check('email', 'El email es obligatior').isEmail(),
    check('password', 'El password es obligatior').not().isEmpty(),
    validarCampos
],
login
)

module.exports = router;