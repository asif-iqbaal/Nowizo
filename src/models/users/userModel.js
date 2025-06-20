import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
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
    },
});


export const User = models.User || mongoose.model('User', userSchema);

