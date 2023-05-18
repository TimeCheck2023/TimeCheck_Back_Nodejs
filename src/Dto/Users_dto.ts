import { Auth_dto } from "./Auth_dto";

//creamos un objeto para transferir datos
export interface Users_dto extends Auth_dto {
    documentType: string;
    documentNumber: string;
    fullName: string;
    address?: string;
    typeofpopulation?: string;
}

export type NotPassword = Omit<Users_dto, 'password'>
export type NotPasswordIdentify = Omit<NotPassword, 'documentNumber'>

export interface Users_Get_dto extends NotPassword {
    confirmados: number;
    pendientes: number;
}