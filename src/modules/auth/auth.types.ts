
  // export interface signUpDTO {
  // email : string;
  // password : string;
  // name : string;  
  // }

  // export interface loginDTO {
  // email : string;
  // password : string;
  // }\

import { z } from "zod";
import { signUpSchema, loginSchema } from './auth.schema.js';

  export type signUpDTO = 
   z.infer<typeof signUpSchema>;

   export type loginDTO =
   z.infer<typeof loginSchema>;


   export interface jwtPayLoad{
    id : string;
    
   }

