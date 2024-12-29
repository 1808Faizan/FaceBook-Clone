import mongoose from "mongoose";
let PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
)
export default mongoose.model('Post',PostSchema)