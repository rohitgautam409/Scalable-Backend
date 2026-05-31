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

export const refreshSchema = z.object({
    refreshToken : z.string()
})


export const envSchema = z.object({
    DATABASE_URL : z.string(),
    JWT_SECRET : z.string(),
    FRONTEND_URL : z.string(),
    PORT : z.string()
})