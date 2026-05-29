import {jwtPayLoad} from '../../modules/auth/auth.types.ts'

declare global{
    namespace Express {
        interface Request{
            user?: jwtPayLoad
        }
    }
}