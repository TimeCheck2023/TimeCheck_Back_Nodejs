// estan los querys de los procedimientos alamacenados a usar
const querys = {

  
  getUsers: "sp_ObtenerUsuarios",
  getUserId: "sp_ObtenerUsuario_id",
  getUserSubOrgMiembro: "sp_ObtUsuariosMiembrosSubOrg",
  CreateUsersRegister: "sp_INSERT_USUARIO",
  UpdateUser: "sp_UpdateUsuario",
  deleteUserId: "sp_DeleteUsuario",

  getOrg: "sp_ObtenerOrg",
  getOrgId: "sp_ObtenerOrganizacionId",
  CreateOrganizacionRegister: "sp_INSERT_ORGANIZACION",
  UpdateOrgId: "sp_UpdateOrgId",
  deleteOrgId: "sp_DeleteOrg",

  getSubOrg: "sp_ObtenerSubOrgCreated",
  getSubOrgId: "sp_ObtenerSubOrganizacionId",
  CreateSubOrganizacionRegister: "sp_INSERT_SUBORGANIZACION",
  updateSubOrgId: "sp_UpdateSuborganizacion",

  VeryUsersLogin: "sp_autenticar_usuario",
  VerificarEmail: "sp_Verificacion_email",


  getComments: "sp_ObtenerComentarios",
  addComments: "sp_InsertComment"
};

export default querys;
