const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {

  try {
    const medicosDB = await Medico.find()
                                  .populate("usuario", "nombre email")
                                  .populate("hospital", "nombre");
//populate sirve para obtener info especifica de las otras tablas vinculadas
    res.json({
      ok: true,
      medicos: medicosDB,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearMedico = async (req, res = response) => {
  const medico = new Medico({
    ...req.body,
    usuario: req.uid,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Consulta con el administrador",
    });
  }
};

const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarMedico",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
