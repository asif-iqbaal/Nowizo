import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    displayName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
    },
    like:{
        type:Number,
        default:0,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    followers:{
        type:Number,
        default:0,
    },
    following:{
        type:Number,
        default:0,
    },
    bio:{
        type:String,
        default:"hey there i am using NoWiZo"
    },
    posts:{
        type:Number,
        default:0,
    },
    userPosts:[
    { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
    }
    ]
});


export const User = models.User || mongoose.model('User', userSchema);

