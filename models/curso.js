const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre debe de ser obligatorio'],
        unique: true
    },
    maestro: {
        type: String,
        require: [true, 'El maestro es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripcion debe de ser obligatorio'],
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});

CursoSchema.methods.toJSON = function(){
    const{ __v, _id, ...curso} = this.toObject();
    curso.uid = _id;
    return curso;
};

module.exports = model('Curso', CursoSchema);