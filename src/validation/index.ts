import {z} from 'zod';

export const SignupSchema = z.object({
    username: z.string().min(5,{message:"username should more than 5 letter"}),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8,{message:"min 8 character"}),
    displayName:z.string().min(2,{message:"enter your display name"})
});

export const LoginSchema =z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(8,{message:"min 8 character"})
})

// export const CreatePostSchema = z.object({
//   file: z
//     .instanceof(File, { message: "Image is required" })
//     .refine((file) => file.size > 0, { message: "File cannot be empty" }),
//   caption: z.string().min(1, "Caption is required"),
// });

export const CreatePostSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File cannot be empty" })
    .optional(),
  caption: z.string(),
});

