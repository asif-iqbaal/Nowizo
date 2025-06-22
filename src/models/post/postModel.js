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
   },
   commnets:{
    type:String,
   }
},
 {
    timestamps: true,
  });

export const Post = models.Post || mongoose.model('Post', postSchema);