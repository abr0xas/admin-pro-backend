const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        //Esto crea una relación entre el medico y un usuario ¿por el id?
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        //Esto crea una relación entre el hostipal y un médico ¿por el id?
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

//Configuración global en el schema para quitar __v, cambiar _id por uid
MedicoSchema.method('toJSON', function(){
const {__v, ...object } = this.toObject();
return object;
})

module.exports = model( 'Medico', MedicoSchema );