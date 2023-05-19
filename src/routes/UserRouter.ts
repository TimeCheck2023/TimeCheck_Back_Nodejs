import { Router } from "express";
// importams el controlador
import UsersController from "../controller/UserControllers";
//middleware que hace la validacion de los datos que entran
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import authMiddleware from "../middlewares/AuthMiddleware";
// shema que tendra el objeto de la validacion de datos de entrada
import { userSchemaR, userSchemaUpdate } from "../utils/schema";

const controller = new UsersController();

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      properties:
 *        documentType:
 *          type: string
 *        documentNumber:
 *          type: string
 *        fullName:
 *          type: string
 *        address:
 *          type: string
 *        emailAddress:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - documentType
 *        - documentNumber
 *        - fullName
 *        - address
 *        - emailAddress
 *        - password
 *      example:
 *        documentNumber: '12354789' 
 *        documentType: cc | tl | 
 *        fullName: pepito 
 *        address: carrera | barrio | depa
 *        emailAddress: example@example.com
 *        password: Pepito123
 * 
 *    userGet:
 *       type: object
 *       properties:
 *         nro_documento_usuario:
 *           type: string
 *         nombre_completo_usuario:
 *           type: string
 *         tipo_documento_usuario:
 *           type: string
 *         direccion_usuario:
 *           type: string
 *         tipo_poblacion_usuario:
 *           type: string
 *         correo_usuario:
 *           type: string
 *         confirmados:
 *           type: number
 *         pendientes:
 *           type: number
 * 
 *    userGetMiembro:
 *       type: object
 *       properties:
 *         nro_documento_usuario:
 *           type: string
 *         nombre_completo_usuario:
 *           type: string
 *         tipo_documento_usuario:
 *           type: string
 *         direccion_usuario:
 *           type: string
 *         tipo_poblacion_usuario:
 *           type: string
 *         correo_usuario:
 *           type: string
 *         id_miembro:
 *           type: number
 *         rol:
 *           type: number
 *         id_suborganizacion:
 *           type: number
 *         nombre_suborganizacion:
 *           type: string
 *         descripcion_suborganizacion:
 *           type: string
 *
 *
 *    PutUser:
 *      type: object
 *      properties:
 *         fullName:
 *           type: string
 *         documentType:
 *           type: string
 *         emailAddress:
 *           type: string
 *         address:
 *           type: string
 *         typeofpopulation:
 *           type: string

 *  parameters:
 *    userId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: the user id 
 *               
 */

/**
 * @swagger
 * tags:
 *  name: user
 *  description: user endpoint
 */

/**
 * @swagger
 *  /user:
 *   get:
 *    summary: obtener todos los usuarios del sistema
 *    tags: [user]
 *    responses:
 *      200:
 *        description: get user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userGet'
 *      404:
 *        description: usuaria no encontrados
 *        
 */
router.get('/', controller.getUsers)

/**
 * @swagger
 * /user/{id}:
 *  get:
 *   summary: obtener un usuario por el id
 *   tags: [user]
 *   parameters:
 *     - $ref: '#/components/parameters/userId'
 *   responses:
 *     200:
 *       description: get user id
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/userGet'
 *     404:
 *       description: La usuaria no fue encontrada
 *  
 */
router.get("/:id", controller.getUserId);

/**
 * @swagger
 * /user/SubOrgMiembro/{id}:
 *  get:
 *   summary: obtener los usuario que son miembros de una subOrganizacion mandar id de la subOrganizacion
 *   tags: [user]
 *   parameters:
 *     - $ref: '#/components/parameters/userId'
 *   responses:
 *     200:
 *       description: get user id
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/userGetMiembro'
 *     404:
 *       description: La usuaria no fue encontrada
 */

router.get("/SubOrgMiembro/:id", controller.getUserSubMiembroId);

/**
 * @swagger
 * /user/register:
 *  post:
 *   summary: registra un nuevo usuario al sistema
 *   tags: [user]
 *   requestBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/user'
 *   responses:
 *     200:
 *       description: Gracias por registrarse!!!
 *     404:
 *       description: El email o numero de documento ya se encuentra en el sistema
 */
router.post("/register", validateDataMiddle(userSchemaR), controller.registerUser);

/**
 * @swagger
 * /user/update/{id}:
 *  put:
 *   summary: actualiza un usuario por el id del usuario
 *   tags: [user]
 *   parameters:
 *    - $ref: '#/components/parameters/userId'
 *   requestBody:
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/PutUser'
 *   responses:
 *      200:
 *        description: Usuario actualizado correctamente
 *      404:
 *        description: el usuaria no fue encontrada 
 */
router.put("/update/:id", validateDataMiddle(userSchemaUpdate), controller.updateUser);

router.delete("/delete/:id", controller.deleteUser);
// router.get("/User", authMiddleware, controller.getUser);

export default router;