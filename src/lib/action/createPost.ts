"use server";

import { getUser } from '@/lib/auth';
import { User } from '@/models/users/userModel';
import { Post } from '@/models/post/postModel';
import { redirect } from 'next/navigation';
import { DBconnect } from '@/dbConfig/dbConfige';
import cloudinary from '@/cloaudinary/cloudinary'; // ✅ default import now

export async function PostContent(props: { file: File; caption: string }) {
  try {
    await DBconnect();
    const user = await getUser();
    if (!user) {
      redirect('/auth/login');
    }
    const { file, caption } = props;

    let imageURL = '';

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'nowizo' },
          (err, result) => {
            if (err) return reject(err);
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
      { $inc: { posts: 1 } },
      { new: true }
    );
    return {
      message: 'Post successfully',
      status: 200,
      post: newPost,
    };
  } catch (error: any) {
    console.error('❌ PostContent error:', error);
    return {
      message: 'Something went wrong',
      error: error.message,
      status: 500,
    };
  }
}
