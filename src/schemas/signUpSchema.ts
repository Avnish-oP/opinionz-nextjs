import {date, z} from 'zod';

export const usernameValidation = z.string().min(3, {message:"Username is too short"}).max(20, {message:"Username is too long"}).regex(/^[a-zA-Z0-9_]*$/, {message:"Username can only contain letters, numbers and underscores"});

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(8, {message:"Password is too short"}).max(20, {message:"Password is too long"}),
    dateOfBirth: z.date().refine((date) => {
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 13;
    }, {message:"You must be at least 13 years old to sign up"})

})
