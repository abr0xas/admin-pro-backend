const { response } = require('express')

const Hospital = require('../models/hospital')

const geHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img email')

    res.json({
        ok: true,
        hospitales
    })

}

const crearHospital = async(req, res = response) => {

    //Necesito el uid del usuario para guardarlo en el hospital,
    //En la valicación del token guardamos el uid en la req
    const uid = req.uid;
    const hospital = new Hospital ( {
        usuario: uid,
        ...req.body // desestructuro todos los campos que vienen en el body
    } );

    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })

        
    } catch (error) {
        console.log( error );
        res.status(500).json({ 
            ok: false,
            msg: "Hable con el administrador"
        })
        
    }
    
}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
    
}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
    
}


module.exports = {
    geHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}