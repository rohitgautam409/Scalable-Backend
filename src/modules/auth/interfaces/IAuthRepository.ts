
import type { signUpDTO} from '../auth.types.js'
import type {User} from '@prisma/client'


export interface IAuthRepository {

    createUser(data : signUpDTO): Promise<User>

    findUserByEmail(email :string) : Promise<User | null>

    findUserById(id :string) : Promise<User | null>

}