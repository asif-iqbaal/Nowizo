"use server"

import jwt from "jsonwebtoken";
import {User} from "@/models/users/userModel.js";
import { DBconnect } from "@/dbConfig/dbConfige.js";

export async function verifyEmail(token: string) {
  await DBconnect();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userID:string};
    const user = await User.findById(decoded.userID);
    if (!user) return { success: false, message: "User not found" };

    if (user.isVerified) return { success: true, message: "Email already verified" };

    user.isVerified = true;
    await user.save();

    return { success: true, message: "Email verified successfully" };
  } catch (error:any) {
    return { success: false, error : error , message: "Invalid or expired token" };
  }
}
