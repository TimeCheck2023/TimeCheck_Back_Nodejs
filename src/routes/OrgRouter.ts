import { Router } from "express";
import OrgController from "../controller/OrgControllers";
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { OrgSchemaR } from "../utils/schema";
const controller = new OrgController();

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    getOrganizations:
 *      types: object
 *      properties:
 *        id_organización: 
 *          types: number
 *        organization_name: 
 *          types: string
 *        address_organization: 
 *          types: string
 *        email_organization:
 *          types: string
 *        id_telefono: 
 *          types: number
 *        numero_telefono: 
 *          types: number
 *    
 *    postOrganizations:
 *      types: object
 *      properties:
 *        organization_name: 
 *          types: string
 *        address_organization: 
 *          types: string
 *        email_organization:
 *          types: string
 *        organization_password:
 *          types: string
 *        numero_telefono: 
 *          types: number
 *    
 *    putOrganizations:
 *      types: object
 *      properties:
 *        organization_name: 
 *          types: string
 *        address_organization: 
 *          types: string
 *        email_organization:
 *          types: string
 *        numero_telefono: 
 *          types: number
 *   
 *  parameters:
 *    org_id:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: number
 *       description: organizacion por id     
 */



/**
 * @swagger
 * tags:
 *  name: organizacion
 *  description: organizacion endpoint
 */

/**
 * @swagger
 *  /org:
 *   get:
 *    summary: obtiene todas las organizacion de nuestro sistema
 *    tags: [organizacion]
 *    responses:
 *      200:
 *        description: Este sera el schema que obtendras
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/getOrganizations'
 *      400:
 *        description: La orgizacion no fue encontrada
 */

router.get('/', controller.getOrg)


/**
 * @swagger
 *  /org/{id}:
 *   get:
 *    summary: obtener los datos de la organizacion por el id de la organizacion
 *    tags: [organizacion]
 *    parameters:
 *      - $ref: '#components/parameters/org_id'
 *    responses:
 *      200:
 *        description: Este sera el schema que obtendras
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/getOrganizations'
 *      400:
 *        description: La orgizacion no fue encontrada
 */

router.get('/:id', controller.getOrgId)
/**
 * @swagger
 * /Org/register:
 *  post:
 *   summary: Crear una organizacion
 *   tags: [organizacion]
 *   requestBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/postOrganizations'
 *   responses:
 *     200:
 *       description: Gracias por registrarse!!!
 *     404:
 *       description: El email o numero de documento ya se encuentra en el sistema
 */

router.post('/register', validateDataMiddle(OrgSchemaR), controller.registerOrg)

/**
 * @swagger
 * /org/update/{id}:
 *  put:
 *   summary: actualiza la organizacion por el id de la organizacion
 *   tags: [organizacion]
 *   parameters:
 *    - $ref: '#/components/parameters/org_id'
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/putOrganizations'
 *   responses:
 *     200:
 *       description: organization actualizado correctamente
 *     404:
 *       description: la organizacion no fue encontrada 
 */
router.put('/update/:id', validateDataMiddle(OrgSchemaR), controller.updateOrgId)


/**
 * @swagger
 * /org/delete/{id}:
 *  delete:
 *    summary: eliminara una organizacions por id
 *    tags: [organizacion]
 *    parameters:
 *      - $ref: '#/components/parameters/org_id'
 *    responses:
 *      200:
 *        description: organization actualizado correctamente
 *      404:
 *        description: la organizacion no fue encontrada 
 *   
 */
router.delete('/delete/:id', controller.deleteOrgId)


export default router;