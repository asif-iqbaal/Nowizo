"use server"

import { getUser } from '@/lib/auth';
import {Post} from '@/models/post/postModel.js'
import { redirect } from 'next/navigation';
import { DBconnect } from '@/dbConfig/dbConfige';
import Cloudinary from '@/cloaudinary/cloudinary.js';


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
            const result = await new Promise((resolve,reject)=>{
                Cloudinary.uploader.upload_stream()
            })
        }
        
    } catch (error:any) {
        throw(error);
    }
}