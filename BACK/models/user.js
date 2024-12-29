import mongoose from "mongoose";
import validator from "validator";
let UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max:50,
        validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        default:50
    },
    city:{
        type:String,
        default:50
    },
    from:{
        type:String,
        default:50
    },
    relationship:{
        type:String,
        enum:['Single','Married']
    },
},
{timestamps:true}
)
export default mongoose.model("User", UserSchema)