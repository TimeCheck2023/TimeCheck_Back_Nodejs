import express, { Application } from "express";

//importo la conexion a la base de datos
import './database/Connection'

//importo las rutas del sistema
import usersRouter from "./routes/UserRouter";
import OrgRouter from "./routes/OrgRouter";
import AuthRouter from "./routes/AuthRouter";


//registro de petciones del sistema
import morgan from "morgan";

// permite la autorizacion a mi servidor
import cors from "cors";

// variables de entorno
import config from "./config";

// manejador de errores
import errorHandler from "./middlewares/ErrorMiddleware";

// class de la configuracion del servidor
class Server {

    // atributos
    app: Application;
    port: string | number;

    //constructor
    constructor() {
        //aca iniciamos express
        this.app = express();
        // condig de port
        this.port = config.PORT || 3000;

        //medtodos iniciales
        this.middleware();
        this.Routes();
    }

    // middleware
    middleware() {
        // Cors
        this.app.use(cors());
        // lectura de Body
        this.app.use(express.json());
        //registro de peticiones
        this.app.use(morgan('dev'));

        this.app.use(errorHandler);
    }

    //routes
    Routes() {
        this.app.use('/user', usersRouter)
        this.app.use('/Auth', AuthRouter)
        this.app.use('/Org', OrgRouter)
    }

    //server
    listen() {
        this.app.listen( this.port, () => {
            console.log(`server listening on port ${this.port}`);
        }); 
    }
}

export default Server;