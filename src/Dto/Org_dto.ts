export interface Org_dto {
    organization_name: string;
    address_organization: string;
    email_organization: string;
    organization_password: string;
    numero_telefono: number;
    device: string;
    image_url: string;
}

export type NotPassword_Org = Omit<Org_dto, 'organization_password'>

export interface Org_id_telefono_dto extends Org_dto{
    id_telefono: number;
}