const { Router } = require('express');
const { check } = require('express-validator');
const { existeEmail, esRoleValido, existeEstudianteById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

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
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("curso", "debe ingresar un curso").not().isEmpty(),
        check("correo").custom(existeEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], estudiantePost
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