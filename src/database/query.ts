// estan los querys de los procedimientos alamacenados a usar
const querys = {
    getUsers: "sp_ObtenerUsuarios",
    getUserId: "sp_ObtenerUsuario_id",
    getUserSubOrgMiembro: "sp_ObtUsuariosMiembrosSubOrg",
    CreateUsersRegister: "sp_INSERT_USUARIO",
    UpdateUser: "sp_UpdateUsuario",


    getOrgId: "sp_ObtenerOrganizacionId",
    CreateOrganizacionRegister: "sp_INSERT_ORGANIZACION",
    UpdateOrgId: "sp_UpdateOrgId",


    CreateSubOrganizacionRegister: "sp_INSERT_SUBORGANIZACION",
    getSubOrgId: "sp_ObtenerSubOrganizacionId",
    updateSubOrgId: "sp_UpdateSuborganizacion",

    
    VeryUsersLogin: "sp_autenticar_usuario",
    
    getEvent: "sp_ObtenerEventos",
}


export default querys;
