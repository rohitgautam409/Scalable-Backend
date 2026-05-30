import {prisma} from '../../config/prisma.js'


export class RefreshTokenRepository{

    //create a new refresh token and store it in the database
    async createToken(token :string,userId :string,expiresAt : Date){

        return await prisma.refreshToken.create({
            data : {
                token,
                userId,
                expiresAt
            }
        })
    }
    
    //find token by token string
    async findToken(token :string){

        return await prisma.refreshToken.findUnique({
            where : {
                token
            }
        })
    }
    //delete token by token string

    async deleteToken(token :string){
        await prisma.refreshToken.delete({
            where : {
                token
            }
        })
    }
}