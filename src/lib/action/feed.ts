"use server"

import { User } from "@/models/users/userModel";
import { Post } from "@/models/post/postModel";
import { DBconnect } from "@/dbConfig/dbConfige";
import { getUser } from "../auth";
import { IToken } from "@/context";

export async function userFeed(){
    try {
        await DBconnect();
        const user: IToken | any = await getUser();
        const currentUserId = user?.userID;
        if(!user){
           throw new Error("User not logged in");
        }
        const userDetails = await User.findById(currentUserId);
        const userFollowingIds = userDetails.userFollowing;

        const posts = await Post.find({user: {$in: userFollowingIds}}).populate("user","username displayName").sort({createdAt : -1});

        return  JSON.parse(JSON.stringify(posts));
            
    } catch (error:any) {
        throw(error);
    }
}
