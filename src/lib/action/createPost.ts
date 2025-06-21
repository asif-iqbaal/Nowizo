"use server"

import { getUser } from '@/lib/auth';
import {Post} from '@/models/post/postModel.js'
import { redirect } from 'next/navigation';
import { DBconnect } from '@/dbConfig/dbConfige';
import Cloudinary from '@/cloaudinary/cloudinary.js';
import sendVerificationEmail from '@/lib/action/sendEmialVerification';

export async function PostContent(props:any){
    try {
        await DBconnect();
        const user = await getUser();
        if(!user){
            redirect('/auth/login');
        }
        const {file, caption} = props;

        let imageURL = '';
        
        if(file){
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result:any = await new Promise((resolve,reject)=>{
                Cloudinary.uploader.upload_stream({folder:'nowizo'},(err:any,result:any)=>{
                    if (err) return redirect(err);
                    resolve(result);
                }).end(buffer)
            })
            imageURL = result.secure_url;
        }
        const PostCreate = await Post.create({
            image:imageURL,
            caption
        });

        await PostCreate.save();
        return {
            message:'Post successfully',
            status:200
        }
    } catch (error:any) {
        return{
            message:'Something went wrong',
            error,
            status:500
        }
    }
}