import { Org_dto, Org_id_telefono_dto } from "../Dto/Org_dto";

export default interface Org_interface {
    getOrgId(id_organizacion: number): Promise<Org_id_telefono_dto[] | unknown>
    createOrganization(data: Org_dto): Promise<string | unknown>
    updateOrganization(data: Org_dto, id_organizacion: number): Promise<string | unknown>
}