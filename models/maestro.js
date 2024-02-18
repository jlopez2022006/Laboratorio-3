const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },
    curso: {
        type: String,
        require: [true, 'El curso es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ["TEACHER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
});

MaestroSchemaSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...maestro} = this.toObject();
    maestro.uid = _id;
    return maestro;
};

module.exports = model('Maestro', MaestroSchema);