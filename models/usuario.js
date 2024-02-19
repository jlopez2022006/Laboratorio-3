const STUDENT_ROLE = 'alumno';
const TEACHER_ROLE = 'docente';
const mongoose = require('mongoose');

class Usuario {
    constructor() {
        mongoose.connect('mongodb://localhost:27017/Control_Academico_2022006', {

        });

        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {
            console.log('Conexión exitosa a MongoDB');
        });
    }

    authenticate(correo, password) {
        if (correo === 'alumno' && password === 'contraseña') {
            return { authenticated: true, role: STUDENT_ROLE };
        } else if (correo === 'docente' && password === 'contraseña') {
            return { authenticated: true, role: TEACHER_ROLE };
        } else {
            return { authenticated: false };
        }
    }
}

module.exports = {
    Usuario,
    STUDENT_ROLE,
    TEACHER_ROLE
};