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

// export const ProfileUpdate = z.object({
//  file: z
//   .any()
//   .refine(
//     (val) =>
//       val === undefined || (val instanceof File && val.size > 0),
//     { message: "Invalid or empty file" }
//   )
//   .optional(),

//   username: z.string().min(3,{message:"username should more than 3 letter"}).optional(),
//   displayName:z.string().min(2,{message:"enter your display name"}).optional(),
//   bio:z.string().min(1,{message:"minimum 1 character"}).optional(),
//   });

// export const ProfileUpdate = z.object({
//   file: z
//     .any()
//     .refine(
//       (val) =>
//         (val instanceof File && val.size > 0),
//       { message: "Invalid or empty file" }
//     )
//     .optional(),

//   username: z.preprocess(
//     (val) => val === "" ? undefined : val,
//     z.union([z.string().min(3, { message: "username should more than 3 letter" }), z.undefined()])
//   ),

//   displayName: z.preprocess(
//     (val) => val === "" ? undefined : val,
//     z.union([z.string().min(2, { message: "enter your display name" }), z.undefined()])
//   ),

//   bio: z.preprocess(
//     (val) => val === "" ? undefined : val,
//     z.union([z.string().min(1, { message: "minimum 1 character" }), z.undefined()])
//   ),
// });

export const ProfileUpdate = z.object({
  file: z
    .any()
    .refine(
      (val) =>
        (val instanceof File && val.size > 0),
      { message: "Invalid or empty file" }
    )
    .optional(),

  username: z
    .string()
    .min(3, "username should be more than 3 letters")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),

  displayName: z
    .string()
    .min(2, "enter your display name")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),

  bio: z
    .string()
    .min(1, "minimum 1 character")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});
