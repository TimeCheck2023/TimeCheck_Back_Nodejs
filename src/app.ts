import express, { Application } from "express";
import './database/Connection'
import usersRouter from "./routes/usersRouter";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import errorHandler from "./middlewares/ErrorMiddleware";

class Server {

    app: Application;
    port: string | number;

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
    }

    //server
    listen() {
        this.app.listen( this.port, () => {
            console.log(`server listening on port ${this.port}`);
        }); 
    }
}

export default Server;