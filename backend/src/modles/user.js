import mongoose  from "mongoose";
const userSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true 
    },
    role:{
        type:String,
        enum:['patient','doctor'],
        default:'patient'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;