// estan los querys de los procedimientos alamacenados a usar
const querys = {
    CreateUsersRegister: "sp_INSERT_USUARIO",
    CreateOrganizacionRegister: "sp_INSERT_ORGANIZACION",
    CreateSubOrganizacionRegister: "sp_INSERT_SUBORGANIZACION",
    VeryUsersLogin: "sp_autenticar_usuario",
    getEvent: "sp_ObtenerEventos",
    getUserId: "sp_ObtenerUsuarios",
    UpdateUser: "sp_UpdateUsuario"
}


export default querys;
