/*
    Ruta: /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Rutas
router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe se válido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put("/:id",
  [
    validarJWT,
    check("nombre", "El nombre es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe se válido").isMongoId(),
    validarCampos,
  ]
, actualizarMedico);

router.delete("/:id",validarJWT, borrarMedico);

module.exports = router;
