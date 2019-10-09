import UserRepository from '@/repositories/user-repository'
import { UserData } from '@/types/user'

class UserService {
  public async getUser(): Promise<UserData> {
    const data: UserData = await UserRepository.getUser()
    return data
  }
}

export default new UserService()
