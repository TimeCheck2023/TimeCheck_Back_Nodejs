import { Router } from "express";
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { userSchemaL } from "../utils/schema";
import AuthController from '../controller/AuthControllers'
const controller = new AuthController();

const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    codigo:
 *      type: object
 *      properties:
 *        codigo:
 *          type: number
 *      required:
 *        - codigo
 *    email:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *      required:
 *        - email
 *    DataPassword:
 *      type: object
 *      properties:
 *        password:
 *          type: string
 *        nro_documento_usuario:
 *          type: string
 *      required:
 *        - password
 *        - nro_documento_usuario
 *      
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: user endpoint
 */

router.post('/login', validateDataMiddle(userSchemaL), controller.loginUser);

/**
 * @swagger
 * /Auth/verificacion:
 *  post:
 *   summary: verificar si si es un email valido
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/codigo'
 *   responses:
 *     200:
 *       description: Gracias por la verificacion!!!
 *     404:
 *       description: NO TRATES DE ENGAÑARNOS TU CODIGO NO ES VALIDO PARA NOSTROS
 */
router.post('/verificacion', controller.verificacionUser);

/**
 * @swagger
 * /Auth/verificacionEmail:
 *  post:
 *   summary: verificar si el email esta en el sistema para cambio de la password
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/email'
 *   responses:
 *     200:
 *       description: Tus datos!!!
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/email'
 *     404:
 *       description: NO TRATES DE ENGAÑARNOS TU CODIGO NO ES VALIDO PARA NOSTROS
 */
router.post('/verificacionEmail', controller.verificacionEmail);

/**
 * @swagger
 * /Auth/CambioPassword:
 *  post:
 *   summary: cambiar la password por el numero de id
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/DataPassword'
 *   responses:
 *     200:
 *       description: Password cambiada exitosamente!!!
 *     404:
 *       description: EL ID NO EXISTE EN NUESTRO SISTEMA
 */
router.post('/CambioPassword', controller.CambioPassword);


export default router;