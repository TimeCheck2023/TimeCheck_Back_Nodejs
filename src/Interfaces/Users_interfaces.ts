import { NotPassword, Users_Get_dto, Users_dto } from "../Dto/Users_dto";

//contratos que tendran las class

export default interface Users_interface {
  createUser(data: Users_dto): Promise<string | unknown>;
  UpdateUsers(data: Users_dto, documentNumber: number): Promise<string | unknown>;
  getUserId(documentNumber: number): Promise<NotPassword[] | unknown>;
  getUsers(documentNumber: number): Promise<Users_Get_dto[] | unknown>;
}
