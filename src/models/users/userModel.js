import mongoose, { Schema, Document, models } from 'mongoose';


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
    isAdmine:{
        type:Boolean,
        default:false
    }
});


export const User = models.User || mongoose.model('User', userSchema);

