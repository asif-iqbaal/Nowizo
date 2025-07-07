"use server";

import { getUser } from '@/lib/auth';
import { User } from '@/models/users/userModel';
import { Post } from '@/models/post/postModel';
import { redirect } from 'next/navigation';
import { DBconnect } from '@/dbConfig/dbConfige';
import cloudinary from '@/cloaudinary/cloudinary'; // ✅ default import now
import { IToken } from '@/context';
import { UploadApiResponse } from 'cloudinary';

export async function PostContent( props: { file?: File; caption: string; }) {
  try {
    await DBconnect();
    const user:IToken | null = await getUser();
    if (!user) {
      redirect('/auth/login');
    }
    const { file, caption } = props;

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

    const newPost = await Post.create({
      user:user.userID,
      image: imageURL,
      caption,
    });
    
   await User.findByIdAndUpdate(
  user.userID,
  {
    $inc: { posts: 1 },
    $push: { userPosts: newPost._id }
  },
  { new: true }
);

    return {
      message: 'Post successfully',
      status: 200,
      post: newPost,
    };
  } catch (error: unknown) {
    console.error('❌ PostContent error:', error);
    return {
      message: 'Something went wrong',
      status: 500,
    };
  }
}
