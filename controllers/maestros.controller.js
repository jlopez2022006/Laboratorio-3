const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');
const { response } = require('express');


const maestroPost = async(req, res) => {
    const { nombre, correo, password, curso, role } = req.body;
    const maestro = new Maestro({ nombre, correo, password, curso, role });

    const salt = bcryptjs.genSaltSync();
    console.log(password);
    maestro.password = bcryptjs.hashSync(password, salt);

    await maestro.save();
    console.log({ nombre, correo, password, curso, role })
    res.status(202).json({
        maestro
    });
}

const maestroGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, maestro] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestro
    });
}

const getMaestroById = async(req, res) => {
    const { id } = req.params;
    const maestro = await Maestro.findOne({ _id: id });

    res.status(200).json({
        maestro
    });
}


const maestroPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, role, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const maestro = await Maestro.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'El maestro fue actualizado exitosamente',
        maestro
    });
}

const maestroDelete = async (req, res = response) => {
    const {id} = req.params;
    const maestro = await Maestro.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'El maestro fue eliminado exitosamente',
        maestro
    });
}

module.exports = {
    maestroPost,
    maestroGet,
    getMaestroById,
    maestroPut,
    maestroDelete
}