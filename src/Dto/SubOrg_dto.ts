export interface SubOrg{
    name_organization: string;
    description_organization: string
}


export interface SubOrgId{
    id_suborganizacion: number;
    name_organization: string;
    description_organization: string;
}

export interface SubOrgIdSubOrg{
    id_suborganizacion: number;
    name_organization: string;
    description_organization: string;
    id_organizacion2: number;
}