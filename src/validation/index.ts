import {z} from 'zod';

export const SignupSchema = z.object({
    username: z.string().min(5,{message:"username should more than 5 letter"}),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8,{message:"min 8 letter"})
});
