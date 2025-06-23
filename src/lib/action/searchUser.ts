"use server"

import { User } from "@/models/users/userModel";
import { DBconnect } from "@/dbConfig/dbConfige";

export async function GetUsers(){
    try {
        const users = await User.find();
        return users;
    } catch (error:any) {
        return {
            error,
            message:'server error to find user'
        }
    }
}

export async function GetUserById(id:string){
    try {
       await  DBconnect();
        const response = await User.findOne({_id:id});
        const plainUser = response.toObject(); // ✅ convert to plain object
        return plainUser; // ✅ return the correct thing
    } catch (error:any) {
        return{
            error,
            message:"server error to get user details"
        }
    }
}