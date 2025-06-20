"use server"

import { CreateUser } from "@/context";
import {axiosClient} from "@/lib/utils";
import {User} from '@/models/users/userModel.js';
import { DBconnect } from "@/dbConfig/dbConfige";
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function createUser(props:any){
    try {
        await DBconnect();
        // const reqBody = await request.json();
        const {username, email, password} = props;
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
            email,
            password:hashedPassword
        })
        await newUser.save();
        const payload = {
            user :{
                username:newUser.username,
                email:newUser.email,
                userID:newUser._id
            }
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

        return{ 
            token
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

        const payload = {
            user: {
                username:user.username,
                userID:user._id,
                email:user.email
            }
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET!,
            {expiresIn:'2h'}
        )

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