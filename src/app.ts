import express, { Application } from "express";
import './database/Connection'
import indexRouter from "./routes/index";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

class Server {

    app: Application;
    port: number;

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
        this.app.use(morgan('dev'))
    }

    //routes
    Routes() {
        this.app.use('/v1/api/', indexRouter)
    }

    //server
    listen() {
        this.app.listen( this.port, () => {
            console.log(`server listening on port ${this.port}`);
        }); 
    }
}

export default Server;