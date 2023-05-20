export interface SubOrg{
    name_organization: string;
    description_organization: string
}

export interface SubOrgId{
    id_suborganizacion: number;
    name_organization: string;
    description_organization: string;
}

export interface SubOrgCreated{
    ORGANIZACION_ID: number;
    ORGANIZACION_NOMBRE: string,
    ORGANIZACION_DIRECCION: string;
    ORGANIZACION_CORREO: string;
    SUB_ORGANIZACION_ID: number;
    SUB_ORGANIZACION_NOMBRE: string;
    SUB_ORGANIZACION_DESCRIPCION: string;
    SUB_ORGANIZACION_ID_ORG_FK: number
}

export interface SubOrgIdSubOrg{
    id_suborganizacion: number;
    name_organization: string;
    description_organization: string;
    id_organizacion2: number;
}