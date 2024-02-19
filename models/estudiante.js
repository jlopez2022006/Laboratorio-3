const { Schema, model } = require('mongoose');
const Curso = require('../models/curso');


const EstudianteSchema = Schema({
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
        validate: {
            validator: async function (value) {
                const cursoExistente = await Curso.findOne({ nombre: value });
                return cursoExistente !== null;
            },
        },
        require: [true, 'El curso es obligatorio']
    },

    curso2: {
        type: String,
        validate: {
            validator: async function (value) {
                const cursoExistente = await Curso.findOne({ nombre: value });
                return cursoExistente !== null;
            },
        },
        require: [true, 'El curso es obligatorio']
    },

    curso3: {
        type: String,
        validate: {
            validator: async function (value) {
                const cursoExistente = await Curso.findOne({ nombre: value });
                return cursoExistente !== null;
            },
        },
        require: [true, 'El curso es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ["STUDENT_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
});

EstudianteSchema.methods.toJSON = function () {
    const { __v, password, _id, ...estudiante } = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};

module.exports = model('Estudiante', EstudianteSchema);