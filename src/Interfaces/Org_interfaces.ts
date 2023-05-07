import { Org_dto } from "../Dto/Org_dto";

export default interface Org_interface {
    createOrganization(data: Org_dto): Promise<string | unknown>
}