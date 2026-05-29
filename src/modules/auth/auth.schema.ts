import {z} from 'zod';

export const signUpSchema = z.object({
    name : z.string().min(3,"Name must be atleast 3 characters long").max(50),
    email : z.email("Invalid email address"),
    password : z.string().min(8,"Password must be atleast 8 characters long").max(20)
})

export const loginSchema = z.object({
    email :z.email("Invalid email address"),
    password : z.string().min(8,"Password must be atleast 8 characters long").max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}.*$/)
})