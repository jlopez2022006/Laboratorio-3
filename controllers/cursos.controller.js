const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');

const cursoPost = async (req, res) => {
    const { nombre, maestro, descripcion } = req.body;
    const curso = new Curso({ nombre, maestro, descripcion });

    await curso.save();
    console.log({ nombre, maestro, descripcion })
    res.status(202).json({
        curso
    });
}

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, curso] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        curso
    });
}

const getCursoById = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        curso
    });
}

const cursoPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body


    const curso = await Curso.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Curso Actualizado Exitosamente',
        curso
    });
}

const cursoDelete = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Curso eliminado exitosamente',
        curso
    });
}


module.exports = {
    cursoPost,
    cursoGet,
    getCursoById,
    cursoPut,
    cursoDelete

}