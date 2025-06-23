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

export async function SeachUserPosts(id:string){
    try {
      const response = await User.findById(id).populate("userPosts").lean();
    //   const plainUser = response.toObject();
      const safeData = JSON.parse(JSON.stringify(response));
      return safeData;
    } catch (error:any) {
      return{
        message:"server error",
        error:error.message,
        status:500
      }
    }
}