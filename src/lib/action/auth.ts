"use server"

import {User} from '@/models/users/userModel.js';
import { DBconnect } from "@/dbConfig/dbConfige";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import sendVerificationEmail from "@/lib/action/sendEmialVerification";
import { getUser } from "../auth";
import { IToken, ICreateUser,ILogin } from '@/context';
import cloudinary from '@/cloaudinary/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function createUser(props:ICreateUser){
    try {
        await DBconnect();
        // const reqBody = await request.json();
        const {username, email, password, displayName} = props;
        const user = await User.findOne({email});
        if(user){
            return{ 
            message:'User already exist',
            status:400,
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
     
        return{ 
            token,
            message:"check your email for verification"
        }
    } catch (error:unknown) {
        console.log("error signup",error);
        return {
            message:'Oops something went wrong'
        }
    }
}

export async function loginUser(props:ILogin){
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
    } catch (error:unknown) {
        return {
            messagae:error,
            status:500
        }
    }
}

export async function LoggedUser(){
    try {
        const user:IToken  = await getUser();
        if(user){
        await DBconnect();
        const userDetails = await User.findById(user.userID).populate("userPosts");
        const safeData = JSON.parse(JSON.stringify(userDetails));
        return safeData;
        }
    } catch (error:unknown) 
    {
        throw(error);
    }
}

export async function LoggedUserDetails(){
    try {
        const user: IToken  = await getUser();
        if(user){
            await DBconnect();
            const userDetails = await User.findById(user.userID);
            const safeData = JSON.parse(JSON.stringify(userDetails));
            return safeData;
        }
    } catch (error:unknown) {
        throw(error);
    }
}

export async function UpdateProfile(props:{file?:File, username?:string, displayName?:string, bio?:string}){
    try {
        const userpresent: IToken  = await getUser();
        if(userpresent){
            await DBconnect();
            const user = await User.findById(userpresent.userID);
            const {file,username,displayName,bio} = props;

             let imageURL = '';
            
                if (file) {
                  const arrayBuffer = await file.arrayBuffer();
                  const buffer = Buffer.from(arrayBuffer);
            
                  const result: UploadApiResponse = await new Promise((resolve, reject) => {
                  const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'nowizo' },
                        (err, result) => {
                        if (err) return reject(err);
                        if (!result) return reject(new Error("Upload result is undefined"));
                        resolve(result);
                        }
                    );

                    uploadStream.end(buffer);
                    });
            
                  imageURL = result.secure_url;
                } 

            if(file){
                user.avatar =  imageURL
            }
            if(username){
                user.username = username
            }
            if(displayName){
                user.displayName= displayName
            }
            if(bio){
                user.bio = bio
            }
            // const updateUser = await User.findByIdAndUpdate(user.userID,{
            //     file: user.avatar,
            //     username: user.username,
            //     displayName:user.displayName,
            //     bio:user.bio
            // })
            await user.save();
            return {
                message:"profile updated",
                status:401
            }
        }
    } catch (error:unknown) {
        throw(error);
    }
}

export async function ChangePassword(password:string){
    try {
        const currentUser: IToken = await getUser();
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        await  User.findByIdAndUpdate(currentUser.userID,{
            password : hashedPassword,
        })

        return{
            message:"password updated successfully",
            status:401
        }
    } catch (error:unknown) {
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
    } catch (error:unknown) {
        throw(error);
    }
}