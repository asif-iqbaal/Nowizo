import mongoose,{Schema,models} from 'mongoose';

const postSchema = new Schema({
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    },
    image:{
        type:String,
        required:true,
    },
     caption:{
        type:String,
        required:true
    },
   likes:{
    type:Number,
    default:0
   },
   commnets:{
    type:String,
   },
   type:{
    type:String,
    enum:["post","tagged","saved"],
    default:"post",
   },
},
 {
    timestamps: true,
  });

export const Post = models.Post || mongoose.model('Post', postSchema);