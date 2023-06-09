import express, { Application } from "express";
import http from "http";
import { Socket, Server as WebSocketServer } from "socket.io";

//importo la conexion a la base de datos
import './database/Connection'

// import './utils/node_cron'

//importo las rutas del sistema
import usersRouter from "./routes/UserRouter";
import OrgRouter from "./routes/OrgRouter";
import AuthRouter from "./routes/AuthRouter";
import SubOrgRouter from "./routes/SubOrgRouter";
import NotificationRouter from "./Notifications/Notifications";

//registro de petciones del sistema
import morgan from "morgan";

// permite la autorizacion a mi servidor
import cors from "cors";

// variables de entorno
import config from "./config";

// manejador de errores
import errorHandler from "./middlewares/ErrorMiddleware";

// para crear la configuracion y iniciacion del swagger
import swaggerUi from "swagger-ui-express";
import swaggerSetUp from "./docs/swagger";

// archivo del sockets
import { Socket_io_Comment } from "./sockets/socketComment";
import { Socket_io_Likes } from "./sockets/socketLikes";
import { Socket_io_Asistencia } from "./sockets/socketAsistencia";


// class de la configuracion del servidor
class Server {

    // atributos
    app: Application;
    server: http.Server;
    io: WebSocketServer;
    port: string | number;

    //constructor
    constructor() {

        //aca iniciamos express
        this.app = express();

        // aca le pasamos la configuracion de express al servidor de http 
        this.server = http.createServer(this.app);

        this.io = new WebSocketServer(this.server, {
            cors: {
                origin: '*',
                // methods: ['GET', 'POST'],
                // allowedHeaders: ['Content-Type'],
            },
        });

        // config de port
        this.port = config.PORT || 3000;

        //medtodos iniciales
        this.middleware();
        this.Routes();
    }

    // middleware
    middleware() {

        // Cors mecanismo  de seguridad para restingir o permitir las solicitudes de recursos
        this.app.use(cors());

        // lectura de Body
        this.app.use(express.json());

        //registro de peticiones
        this.app.use(morgan('dev'));

        //uso y config de swgger 
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetUp))

        //uso del manejador de errores del servidor 
        this.app.use(errorHandler);
    }

    //routes
    Routes() {
        this.app.use('/user', usersRouter) //ruta de usuarios
        this.app.use('/Auth', AuthRouter) //ruta de Auth
        this.app.use('/Org', OrgRouter) //ruta de organizacion
        this.app.use('/SubOrg', SubOrgRouter) //ruta de subOrganizacion
        this.app.use('/Notification', NotificationRouter) //ruta de subOrganizacion
    }



    //server
    listen() {
        this.server.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`);
        });

        this.io.on('connection', (socket: Socket) => {
            console.log(`Socket connected: ${socket.id}`);
            new Socket_io_Comment(socket, this.io)
            new Socket_io_Likes(socket, this.io)
            new Socket_io_Asistencia(socket, this.io)
        })

        // socket_io.configureSocketEvents()
    }
}

export default Server;