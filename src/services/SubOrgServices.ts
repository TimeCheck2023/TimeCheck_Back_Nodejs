import SubOrg_interface from "../Interfaces/SubOrg_interface";
import { SubOrg, SubOrgId, SubOrgIdSubOrg } from "../Dto/SubOrg_dto";
import sql from "mssql";
import query from "../database/query";
import pool from "../database/Connection";

class SubOrg_Services implements SubOrg_interface {

  async getSubOrgId(id_organizacion: number): Promise<SubOrgIdSubOrg[] | unknown> {
    try {
      const request = pool.request()
        .input('id_suborganizacion', sql.Int, id_organizacion)
      const result = await request.execute(query.getSubOrgId);
      return result.recordset;
    } catch (error) {
      throw error
    }
  }

  async createSubOrganization({ name_organization, description_organization }: SubOrg, id_organizacion: number): Promise<string | unknown> {
    try {
      const request = pool
        .request()
        .input("nombre_suborganizacion", sql.VarChar(300), name_organization)
        .input(
          "description_suborganizacion",
          sql.VarChar(300),
          description_organization
        )
        .input("id_organizacion", sql.Int, id_organizacion);
      await request.execute(query.CreateSubOrganizacionRegister);
      return "Organizacion insertada correctamente!!";
    } catch (error) {
      throw error
    }
  }

  async updateSubOrg({ name_organization, description_organization }: SubOrg, id_suborganizacion: number): Promise<string | unknown> {
    try {
      const request = pool.request()
        .input("nombre_suborganizacion", sql.VarChar(300), name_organization)
        .input("descripcion_suborganizacion", sql.VarChar(300), description_organization)
        .input("id_suborganizacion", sql.Int, id_suborganizacion);
      await request.execute(query.updateSubOrgId)
      return 'Actualizado exitosa'
    } catch (error) {
      throw error;
    }
  }
}

export default SubOrg_Services;
