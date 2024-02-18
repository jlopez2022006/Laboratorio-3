const { Router } = require('express');
const { check } = require('express-validator');
const { existeEmailMaestro, existeMaestroById, esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    maestroPost,
    maestroGet,
    getMaestroById,
    maestroPut,
    maestroDelete } = require('../controllers/maestros.controller');

const router = Router();

router.get("/", maestroGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos, 
    ], getMaestroById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeMaestroById),
        check("role").custom(esRoleValido),
        validarCampos,
    ], maestroPut
);

router.post(
    "/",
    [
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("curso", "debe ingresar un curso").not().isEmpty(),
        check("correo").custom(existeEmailMaestro),
        check("role").custom(esRoleValido),
        validarCampos,
    ], maestroPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEmailMaestro),
        validarCampos,
    ], maestroDelete
);

module.exports = router;