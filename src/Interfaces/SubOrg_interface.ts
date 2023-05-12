import SubOrg from "../Dto/SubOrg_dto";

export default interface SubOrg_interface{
    createSubOrganization(data: SubOrg, id_organizacion: number): Promise<string | unknown>
}