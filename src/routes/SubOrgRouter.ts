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
 *  /SubOrg/{id}:
 *   get:
 *    summary: traera todos las Suborganization que tiene una organizacion por el id de una organizations
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