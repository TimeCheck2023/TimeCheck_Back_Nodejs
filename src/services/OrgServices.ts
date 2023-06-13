import Org_interface from "../Interfaces/Org_interfaces";
import { Org_dto, Org_id_telefono_dto, NotPassword_Org } from "../Dto/Org_dto";
import query from "../database/query";
import sql from "mssql";
import pool from "../database/Connection";
import { encryptPass } from "../utils/bcrypt";
import generarCodigoAleatorio from "../utils/codigoRandom";
import { getTemplate, sendEmail } from "../utils/nodemailer";


class Org_service implements Org_interface {

    async getOrg(): Promise<Org_id_telefono_dto[] | unknown> {
        try {
            const request = pool.request()
            const result = await request.execute(query.getOrg)
            return result.recordset;
        } catch (error) {
            throw error
        }
    }

    async getOrgId(id_organizacion: number): Promise<Org_id_telefono_dto[] | unknown> {
        try {
            const request = pool.request()
                .input('id_organizacion', sql.Int, id_organizacion)
            const result = await request.execute(query.getOrgId)
            return result.recordset[0];
        } catch (error) {
            throw error
        }
    }

    async createOrganization({ organization_name, address_organization, email_organization, organization_password, numero_telefono, device, image_url }: Org_dto): Promise<string | unknown> {
        const newPassword = await encryptPass(organization_password)
        const codigoAleatorio = generarCodigoAleatorio();
        try {
            const request = pool.request()
                .input('nombre_organizacion', sql.VarChar(250), organization_name)
                .input('direccion_organizacion', sql.VarChar(250), address_organization)
                .input('correo_organizacion', sql.VarChar(250), email_organization)
                .input('contraseña_organizacion', sql.VarChar(250), newPassword)
                .input('numero_telefono', sql.BigInt, numero_telefono)
                .input("codigo", sql.Int, codigoAleatorio)
                .input("image_url", sql.NVarChar(sql.MAX), image_url);
            await request.execute(query.CreateOrganizacionRegister);
            const template = getTemplate(organization_name, codigoAleatorio, device);
            await sendEmail(email_organization, "Verificación de correo electrónico para El aplicativo TimeCheck", template as string);
            return 'Organizacion insertada correctamente!!';
        } catch (error) {
            throw error;
        }
    }

    async updateOrganization({ organization_name, address_organization, email_organization, numero_telefono, image_url }: NotPassword_Org, id_organizacion: number): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input('nombre_organizacion', sql.VarChar(250), organization_name)
                .input('direccion_organizacion', sql.VarChar(250), address_organization)
                .input('correo_organizacion', sql.VarChar(250), email_organization)
                .input('numero_telefono', sql.BigInt, numero_telefono)
                .input('id_organizacion', sql.Int, id_organizacion)
                .input('image_url', image_url);
            const result =  await request.execute(query.UpdateOrgId);
            console.log(result);
            return 'Actualizacion correcta'
        } catch (error) {
            throw error
        }

    }

    async deleteOrganizationId(id_organizacion: number): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input('nro_documento', sql.Int, id_organizacion)
            const result = await request.execute(query.deleteOrgId)
            return result.recordset[0].Mensaje
        } catch (error) {
            throw error;
        }
    }
}

export default Org_service;