const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.alumnosPath = '/api/estudiante';
        this.cursosPath = '/api/curso';
        this.maestrosPath = '/api/maestro';

        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes(){
        this.app.use(this.alumnosPath, require('../routes/estudiante.routes'));
        this.app.use(this.cursosPath, require('../routes/curso.routes'));
        this.app.use(this.maestrosPath, require('../routes/maestro.routes'));

    }
    

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor Conectado Exitosamente', this.port);
        });
    }
}

module.exports = Server;