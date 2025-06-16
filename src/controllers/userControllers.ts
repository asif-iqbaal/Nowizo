import { NextRequest,NextResponse } from 'next/server';
import {User} from '@/models/users/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {DBconnect} from '@/dbConfig/dbConfige.js';

export async function createUser(request: NextRequest){
    try {
        await DBconnect();
        console.log("database connect");
        const reqBody = await request.json();
        const {username, email, passoword} = reqBody;
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {message:'User already exist'},
                {status:401}
            )
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(passoword,salt);
        const newUser = await User.create({
            username,
            email,
            hashedPassword
        })
        await newUser.save();
        const payload = {
            user :{
                username:newUser.username,
                email:newUser.email,
                userID:newUser._id
            }
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET!,
            {expiresIn:'2h'}
        )
        return NextResponse.json(
            token,
            {status:201}
        )
    } catch (error:any) {
        return NextResponse.json(
            {message:'Oops something went wrong'},
            {status:500}
        )
    }
}

export async function loginUser(request: NextRequest){
    try {
         await DBconnect();
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {message:'invalid email'},
                {status:400}
            )
        }

        const isMatched = await bcryptjs.compare(password,user.password!);
        if(!isMatched){
            return NextResponse.json(
                {message:'Incorrect password'},
                {status:400}
            )
        }

        const payload = {
            user: {
                username:user.username,
                userID:user._id,
                email:user.email
            }
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET!,
            {expiresIn:'2h'}
        )

        return NextResponse.json(
            token,
            {status:200}
        )
    } catch (error:any) {
        return NextResponse.json(
            {messagae:error},
            {status:500}
        )
    }
}
