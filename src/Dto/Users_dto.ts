import { Auth_dto } from "./Auth_dto";

export interface Users_dto extends Auth_dto {
    documentType?: string;
    documentNumber?: string;
    fullName: string;
    address?: string;
}