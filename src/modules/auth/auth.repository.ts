import {prisma} from "../../config/prisma.js";

import type {signUpDTO} from './auth.types.js';


//AuthRepository class to handle all database operations related to authentication
export class AuthRepository {

    //Method to create a new user in the database
    async createUser(data :signUpDTO){
        return await prisma.user.create({
            data
        });

    }
    //Method to find a user by their email address
    async findUserByEmail(email : string){
        return await prisma.user.findUnique({
            where :{
                email
            }
        })
    }
    //Method to find a user by their unique ID in the database
    async findUserById(id :string){
        return await prisma.user.findUnique({
            where :{ id }
        })
    }
}