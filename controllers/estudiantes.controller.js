const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiante');

const estudiantePost = async (req, res) => {
    const { nombre, correo, password, curso, role } = req.body;
    const estudiante = new Estudiante({ nombre, correo, password, curso, role });

    const salt = bcryptjs.genSaltSync();
    console.log(password);
    estudiante.password = bcryptjs.hashSync(password, salt);

    await estudiante.save();
    console.log({ nombre, correo, password, curso, role })
    res.status(202).json({
        estudiante
    });
}

const estudianteGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, estudiante] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        estudiante
    });
}

const getEstudianteById = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findOne({ _id: id });

    res.status(200).json({
        estudiante
    });
}

const estudiantePut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, role, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const estudiante = await Estudiante.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Estudiante Actualizado Exitosamente',
        estudiante
    });
}

const estudianteDelete = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        estudiante
    });
}


module.exports = {
    estudiantePost,
    estudianteGet,
    getEstudianteById,
    estudiantePut,
    estudianteDelete

}