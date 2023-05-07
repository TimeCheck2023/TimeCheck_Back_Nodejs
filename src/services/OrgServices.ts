import Org_interface from "../Interfaces/Org_interfaces";
import { Org_dto } from "../Dto/Org_dto";
import query from "../database/query";
import sql from "mssql";
import pool from "../database/Connection";
import { encryptPass } from "../utils/bcrypt";


class Org_service implements Org_interface {
    async createOrganization({ organization_name, address_organization, email_organization, organization_password }: Org_dto) {
        const newPassword = await encryptPass(organization_password)
        try {
            const request = pool.request()
                .input('nombre_organizacion', sql.VarChar(250), organization_name)
                .input('direccion_organizacion', sql.VarChar(250), address_organization)
                .input('correo_organizacion', sql.VarChar(250), email_organization)
                .input('contraseña_organizacion', sql.VarChar(250), newPassword)
            await request.execute(query.CreateOrganizacionRegister);
            return 'Organizacion insertada correctamente';
        } catch (error) {
            throw error;
        }
    }
}

export default Org_service;