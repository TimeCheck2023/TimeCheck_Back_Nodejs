import { Users_dto } from "../Dto/Users_dto";

//contratos que tendran las class

export default interface Users_interface {
  createUser(data: Users_dto): Promise<string | unknown>;
}
