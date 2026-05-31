import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error( 'JWT_SECRET is Missing')
}
if (!process.env.DATATBASE_URL) {
    throw  new Error( 'DATABASE_URL is Missing')
}   
if (!process.env.FRONTEND_URL) {
    throw new Error( 'FRONTEND_URL is Missing')
}
if (!process.env.PORT) {
    throw new Error( 'PORT is Missing')
}
if (!process.env.REFRESH_SECRET) {
    throw new Error( 'REFRESH_SECRET is Missing')
}

 export const env = {
    PORT : process.env.PORT || 3000,
    DATABASE_URL : process.env.DATATBASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    FRONTEND_URL : process.env.FRONTEND_URL || 'http://localhost:5173',
    REFRESH_SECRET : process.env.REFRESH_SECRET
}
