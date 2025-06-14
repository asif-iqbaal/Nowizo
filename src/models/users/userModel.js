import mongoose,{Schema} from 'mongoose';

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

export const user = mongoose.model('User',userSchema);
