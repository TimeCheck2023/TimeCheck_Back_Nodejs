import SubOrg_interface from "../Interfaces/SubOrg_interface";
import SubOrg from "../Dto/SubOrg_dto";
import sql from "mssql";
import query from "../database/query";
import pool from "../database/Connection";

class SubOrg_Services implements SubOrg_interface {
  async createSubOrganization(
    { name_organization, description_organization }: SubOrg,
    id_organizacion: number
  ): Promise<string | unknown> {
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
      const result = await request.execute(query.CreateSubOrganizacionRegister);
      console.log(result);
      return "Organizacion insertada correctamente!!";
    } catch (error) {
      throw error
      console.log("error:" + error)
    }
  }
}

export default SubOrg_Services;
