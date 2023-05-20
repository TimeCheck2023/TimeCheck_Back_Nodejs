import { SubOrg, SubOrgCreated, SubOrgId, SubOrgIdSubOrg } from "../Dto/SubOrg_dto";

export default interface SubOrg_interface {
    getSubOrg(): Promise<SubOrgCreated[] | unknown>
    getSubOrgId(id_organizacion: number): Promise<SubOrgIdSubOrg[] | unknown>
    createSubOrganization(data: SubOrg, id_organizacion: number): Promise<string | unknown>
    updateSubOrg(data: SubOrgId, id_suborganizacion: number): Promise<string | unknown>
}