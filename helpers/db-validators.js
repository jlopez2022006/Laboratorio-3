const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');
const Role = require('../models/rol');
const Maestro = require('../models/maestro');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${role} no existe la base de datos`);

    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error (`El correo ${correo} ya esta registrado`);
    }
}

const existeEstudianteById = async (id = '') => {
    const existeEstudiante = await Estudiante.findOne({id});
    if(existeEstudiante){
        throw  new Error(`El estudiante con el ${ id } no existe`);
    }
}

const existeCurso = async (nombre = '') => {
    const existeCurso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error (`El curso ${nombre} ya esta registrado`);
    }
}

const existeCursoById = async (id = '') => {
    const existeCursoId = await Curso.findOne({id});
    if(existeCursoId){
        throw  new Error(`El curso con el ${ id } no existe`);
    }
}

const existeEmailMaestro = async (correo = '') => {
    const existeEmailMaestro = await Maestro.findOne({correo});
    if(existeEmailMaestro){
        throw new Error (`El correo ${correo} ya esta registrado`);
    }
}

const existeMaestroById = async (id = '') => {
    const existeMaestro = await Maestro.findOne({id});
    if(existeMaestro){
        throw  new Error(`El maestro con el ${ id } no existe`);
    }
}
 
module.exports = {
    esRoleValido,
    existeEmail,
    existeEstudianteById,
    existeCurso,
    existeCursoById,
    existeEmailMaestro,
    existeMaestroById
}