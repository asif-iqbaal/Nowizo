"use server"

import { User } from "@/models/users/userModel";
import { Post } from "@/models/post/postModel";
import { DBconnect } from "@/dbConfig/dbConfige";
import { getUser } from "../auth";

export async function userFeed(){
    try {
        await DBconnect();
        const user = await getUser();
        if(user){
            const 
        }
        
    } catch (error:any) {
        throw(error);
    }
}
