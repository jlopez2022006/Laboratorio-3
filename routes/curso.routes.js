const { Router } = require('express');
const { check } = require('express-validator');
const { existeCursoById, existeCurso } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    cursoPost,
    cursoGet,
    getCursoById,
    cursoPut,
    cursoDelete } = require('../controllers/cursos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { Role } = require('../middlewares/validar-roles');

const router = Router();

router.get("/", cursoGet);


router.post(
    "/",
    [
        validarJWT,
        Role('TEACHER_ROLE'),
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("maestro", "Maestro no puede estar vacio").not().isEmpty(),
        check("maestro", "Maestro no puede estar vacio").not().isEmpty(),
        check("nombre").custom(existeCurso),
        validarCampos,
    ], cursoPost
);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos,
    ], getCursoById
);

router.put(
    "/:id",
    [
        validarJWT,
        Role('TEACHER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos,
    ], cursoPut
);


router.delete(
    "/:id",
    [
        validarJWT,
        Role('TEACHER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos,
    ], cursoDelete
);

module.exports = router;