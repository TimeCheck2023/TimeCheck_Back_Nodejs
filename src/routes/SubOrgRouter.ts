import { Router } from "express";
import SubOrgControllers from '../controller/SubOrgControllers';
import validateDataMiddle from "../middlewares/ValidateDataMiddleware";
import { SubOrgSchemaR } from "../utils/schema";
const controller = new SubOrgControllers()

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    getSubOrg:
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
 *        id_suborganizacion:
 *           types: number
 *        name_organization: 
 *           types: string
 *        description_organization:
 *           types: string 
 *        id_organizacion2:
 *           types: number
 * 
 * 
 *    postSubOrg:
 *      types: object
 *      properties:
 *        name_organization: 
 *          types: string
 *        description_organization:
 *           types: string 
 *    
 *    getSubOrgId:
 *      types: object
 *      properties:
 *        id_suborganizacion:
 *           types: number
 *        name_organization: 
 *           types: string
 *        description_organization:
 *           types: string 
 *        id_organizacion2:
 *           types: number
 *     
 *  parameters:
 *    subOrg_id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *      description_organization: subOrganizacion id
 */

/**
 * @swagger
 *  tags:
 *   name: subOrganization
 *   description: endpoint para la subOrganization
 */

/**
 * @swagger
 *  /SubOrg:
 *   get:
 *    summary: Aca podras ver las suborganizaciones existentes y creadas por su respectiva organizacion
 *    tags: [subOrganization]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/getSubOrg'
 *      404:
 *        description: no tienes suborganizacion creada
 */
router.get('/', controller.getSubOrg)

/**
 * @swagger
 *  /SubOrg/{id}:
 *   get:
 *    summary: para traer las suborganizaciones que existen y a que organizacion estan enlazadas vizualiza el endpoint que trae todas las suborganizaciones y mandamos el id de una organizacion
 *    tags: [subOrganization]
 *    parameters:
 *      - $ref: '#/components/parameters/subOrg_id'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/getSubOrgId'
 *      404:
 *        description: no tienes suborganizacion creada
 */
router.get('/:id', controller.getSubOrgId)


/**
 * @swagger
 *  /SubOrg/register/{id}:
 *   post:
 *    summary: crear una subOrganization que haga parte de una organización deberas mandar el id de organizacion a la cual permanecera
 *    tags: [subOrganization]
 *    parameters:
 *      - $ref: '#components/parameters/subOrg_id'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/postSubOrg'
 *    responses:
 *      200:
 *       description: Gracias haz creado una subOrganization en tu organizacion
 *      404:
 *       description: no se pudo encontrar 
 */
router.post('/register/:id', validateDataMiddle(SubOrgSchemaR), controller.registerSubOrg)

/**
 * @swagger
 *  /SubOrg/update/{id}:
 *   put:
 *    summary: Actualiza una Suborganizacion  por el id de la suborganizacion
 *    tags: [subOrganization]
 *    parameters:
 *       - $ref: '#components/parameters/subOrg_id'
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/postSubOrg'
 *    responses:
 *      200:
 *        description: Gracias haz creado una subOrganization en tu organizacion
 *      404:
 *       description: no se pudo encontrar 
 */

router.put('/update/:id', validateDataMiddle(SubOrgSchemaR), controller.UpdateSubOrg)



export default router;