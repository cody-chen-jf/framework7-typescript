import http from '@/utils/http'
import * as api from '@/interfaces'
import { UserData } from '@/types/user'

class UserRepository {
  public async getUser(): Promise<UserData> {
    const { data } = await http({
      method: 'get',
      url: api.getUser
    })

    return data
  }
}

export default new UserRepository()
