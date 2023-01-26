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

const actualizarMedico = async(req, res = response) => {

  const id = req.params.id;
  const uid = req.uid;

  try {

    const medicoBD = await Medico.findById(id);

    if( !medicoBD ){

      res.status(400).json({
        ok: true,
        msg: "Médico no encontrado por id"
      })
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

    res.json({
      ok: true,
      medicoActualizado
    })
    
  } catch (error) {

    res.status(500).json({
      ok: false,
      msg: "Consulta con el administrador"
    })
    
  }
   
};

const borrarMedico = async(req, res = response) => {
  const id = req.params.id;

  try {

    const medicoBD = await Medico.findById(id);

    if( !medicoBD ){

      res.status(404).json({
        ok: true,
        msg: "Médico no encontrado por id"
      })
    }

    await Medico.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: "Medico eliminado"
    })
    
  } catch (error) {

    res.status(500).json({
      ok: false,
      msg: "Consulta con el administrador"
    })
    
  }
   
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
