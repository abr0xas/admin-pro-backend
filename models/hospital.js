const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        //Esto crea una relación entre el hostipal y un usuario ¿por el id?
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    //En mongo guardará como Hospitales la tabla y no Hospitals
}, { collection: 'hospitales'});

//Configuración global en el schema para quitar __v, cambiar _id por uid
HospitalSchema.method('toJSON', function(){
const {__v, ...object } = this.toObject();
return object;
})

module.exports = model( 'Hospital', HospitalSchema );