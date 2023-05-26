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

export default router;