import Org_interface from "../Interfaces/Org_interfaces";
import { Org_dto, Org_id_telefono_dto, NotPassword_Org } from "../Dto/Org_dto";
import query from "../database/query";
import sql from "mssql";
import pool from "../database/Connection";
import { encryptPass } from "../utils/bcrypt";


class Org_service implements Org_interface {

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

    async createOrganization({ organization_name, address_organization, email_organization, organization_password, numero_telefono }: Org_dto): Promise<string | unknown> {
        const newPassword = await encryptPass(organization_password)
        try {
            const request = pool.request()
                .input('nombre_organizacion', sql.VarChar(250), organization_name)
                .input('direccion_organizacion', sql.VarChar(250), address_organization)
                .input('correo_organizacion', sql.VarChar(250), email_organization)
                .input('contraseña_organizacion', sql.VarChar(250), newPassword)
                .input('numero_telefono', sql.Int, numero_telefono)
            await request.execute(query.CreateOrganizacionRegister);
            return 'Organizacion insertada correctamente!!';
        } catch (error) {
            throw error;
        }
    }

    async updateOrganization({ organization_name, address_organization, email_organization, numero_telefono }: NotPassword_Org, id_organizacion: number): Promise<string | unknown> {
        try {
            const request = pool.request()
                .input('nombre_organizacion', sql.VarChar(250), organization_name)
                .input('direccion_organizacion', sql.VarChar(250), address_organization)
                .input('correo_organizacion', sql.VarChar(250), email_organization)
                .input('numero_telefono', sql.BigInt, numero_telefono)
                .input('id_organizacion', sql.Int, id_organizacion);
            const result = await request.execute(query.UpdateOrgId);
            return result
        } catch (error) {
            throw error
        }

    }
}

export default Org_service;