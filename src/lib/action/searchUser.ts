"use server"

import { User } from "@/models/users/userModel";
import { DBconnect } from "@/dbConfig/dbConfige";
import { getUser } from "../auth";
import {IUserWithPosts, IToken} from '@/context/index'

export async function GetUsers(){
    try {
        const users = await User.find();
        return users;
    } catch (error:unknown) {
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
        const plainUser = response.toObject();
        return plainUser; 
    } catch (error:unknown) {
        return{
            error,
            message:"server error to get user details"
        }
    }
}

export async function SeachUserPosts(id:string){
    try {
      const user:IToken  = await getUser();
      const currentUser : String | null = user.userID;
      const response = await User.findById(id).populate("userPosts").lean<IUserWithPosts>();
    //   const plainUser = response.toObject();
    if (!response) {
      throw new Error("User not found");
    }

   if (!currentUser) {
      response.isFollowed = false;
    } else if (Array.isArray(response.userFollowers) && response.userFollowers.includes(currentUser)) {
      response.isFollowed = true;
    } else {
      response.isFollowed = false;
    }


      const safeData = JSON.parse(JSON.stringify(response));
      return safeData;
    } catch (error:unknown) {
      return{
        message:"server error",
        status:500
      }
    }
}

export async function followUser(targetUserId: string) {
  try {
    const user:IToken  = await getUser(); // Logged-in user
    const currentUserId = user.userID;

    if (currentUserId === targetUserId) {
      throw new Error("You cannot follow yourself.");
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      throw new Error("User not found.");
    }


    if (targetUser.userFollowers.includes(currentUserId)) {
      return {
        message: "Already following",
        status: 200,
      };
    }

    targetUser.userFollowers.push(currentUserId);
    targetUser.followers += 1;
    await targetUser.save();

    currentUser.userFollowing.push(targetUserId);
    currentUser.following += 1;
    await currentUser.save();

    return {
      message: "Followed successfully",
      status: 201,
    };
  } catch (error: unknown) {
    console.error("Follow error:", error);
    throw error;
  }
}

export async function UnFollowUser(targetUserId: string){
    try {
        const user: IToken  = await getUser();
        const currentUserId = user.userID;

        if(currentUserId === targetUserId){
            throw new Error("user can't unfollow themself");
        }

        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(currentUserId);

        currentUser.userFollowing = currentUser.userFollowing.filter((id:string) =>id.toString() !== targetUserId);
        currentUser.following -= 1;
        await currentUser.save();

        targetUser.userFollowers = targetUser.userFollowers.filter((id:string) => id.toString() !== currentUserId)
        targetUser.followers -= 1;
        await targetUser.save();
        
        return{
            message:"Unfollow Successfully",
            status:201
        }
    } catch (error:unknown) {
        console.log("unFollow error",error);
        throw(error);
    }
}