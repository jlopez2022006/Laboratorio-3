const { Router } = require('express');
const { check } = require('express-validator');

const { existeEmail, esRoleValido, existeEstudianteById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const Curso = require('../models/curso');

const {
    estudiantePost,
    estudianteGet,
    getEstudianteById,
    estudiantePut,
    estudianteDelete } = require('../controllers/estudiantes.controller');

const router = Router();

router.get("/", estudianteGet);


router.post(
    "/",
    [
        check("nombre", "Nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("curso", "Debe ingresar un curso").custom(async (value) => {
            const cursoExistente = await Curso.findOne({ nombre: value });
            if (!cursoExistente) {
                throw new Error("El curso no existe en la base de datos");
            }
            return true;
        }),
        check("curso2", "Debe ingresar un curso").custom(async (value) => {
            const cursoExistente = await Curso.findOne({ nombre: value });
            if (!cursoExistente) {
                throw new Error("El curso no existe en la base de datos");
            }
            return true;
        }),
        check("curso3", "Debe ingresar un curso").custom(async (value) => {
            const cursoExistente = await Curso.findOne({ nombre: value });
            if (!cursoExistente) {
                throw new Error("El curso no existe en la base de datos");
            }
            return true;
        }),
        check("correo").custom(existeEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ],
    estudiantePost
);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos,
    ], getEstudianteById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        check("role").custom(esRoleValido),
        validarCampos,
    ], estudiantePut
);


router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos,
    ], estudianteDelete
);

module.exports = router;