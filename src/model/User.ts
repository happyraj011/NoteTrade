import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        length:10
    },
    password:{
        type:String,
        required:true
    }

})

const User=mongoose.models.User ||  mongoose.model("User",userSchema);
export default User;