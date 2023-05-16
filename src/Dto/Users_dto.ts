import { Auth_dto } from "./Auth_dto";

//creamos un objeto para transferir datos
export interface Users_dto extends Auth_dto {
    documentType?: string;
    documentNumber?: string;
    fullName: string;
    address?: string;
    typeofpopulation?: string;
}