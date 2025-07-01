"use server"

import {User} from '@/models/users/userModel.js';
import { DBconnect } from "@/dbConfig/dbConfige";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import sendVerificationEmail from "@/lib/action/sendEmialVerification";
import { getUser } from "../auth";
import { IToken } from '@/context';

export async function createUser(props:any){
    try {
        await DBconnect();
        // const reqBody = await request.json();
        const {username, email, password, displayName} = props;
        const user = await User.findOne({email});
        if(user){
            return{ 
            message:'User already exist'
                }
            
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        const newUser = await User.create({
            username,
            displayName,
            email,
            password:hashedPassword
        })
       // await newUser.save();
          const payload = {
                username:newUser.username,
                email:newUser.email,
                displayName:newUser.displayName,
                userID:newUser._id  
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET!,
            {expiresIn:'2h'}
        );
        
       const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
       sendVerificationEmail(email, verificationLink)
                .then(() => console.log("✅ Email sent!"))
                .catch((err) => console.error("❌ Error sending email:", err));
     

        // (await cookies()).set({
        //             name: '_token',
        //             value: token,
        //             httpOnly: true,
        //             path: '/',
        //             secure: process.env.NODE_ENV === 'production',
        //             maxAge: 60 * 60 * 2 // 2 hours in seconds
        //             })

        return{ 
            token,
            message:"check your email for verification"
        }
    } catch (error:any) {
        console.log("error signup",error);
        return {
            message:'Oops something went wrong'
        }
    }
}

export async function loginUser(props:any){
    try {
         await DBconnect();
        //const reqBody = await request.json();
        const {email, password} = props;
        const user = await User.findOne({email});

        if(!user){
            return {
                message:'invalid email',
                status:400
            }
        }

        const isMatched = await bcryptjs.compare(password,user.password!);
        if(!isMatched){
            return {
                message:'Incorrect password',
                status:400
            }
        }

        const isVerified = await user.isVerified;
        if(!isVerified){
            return {
                message:"please verify youself from email verification",
                status:400
            }
        }

        const payload = {
                username:user.username,
                userID:user._id,
                displayName:user.displayName,
                email:user.email
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET!,
            {expiresIn:'2h'}
        );

         (await cookies()).set({
                    name: '_token',
                    value: token,
                    httpOnly: true,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 2 // 2 hours in seconds
                    })

        return {
            token,
            status:200
        }
    } catch (error:any) {
        return {
            messagae:error,
            status:500
        }
    }
}

export async function LoggedUser(){
    try {
        const user: IToken | any = await getUser();
        if(user){
        await DBconnect();
        const userDetails = await User.findById(user.userID).populate("userPosts");
        const safeData = JSON.parse(JSON.stringify(userDetails));
        return safeData;
        }
    } catch (error:any) 
    {
        throw(error);
    }
}

export async function Logout(){
    try {
        const cookiesStore = cookies();
       (await cookiesStore).set("_token","",{
        path:'/',
        maxAge:0
       });
    } catch (error:any) {
        throw(error);
    }
}