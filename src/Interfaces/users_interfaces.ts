import { Users_dto } from "../Dto/Users_dto";


export default interface Users_interface {
  createUser(data: Users_dto): Promise<string>
}