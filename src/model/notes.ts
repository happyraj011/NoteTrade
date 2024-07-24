import mongoose from "mongoose";

const notesSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        min:6,
        max:12,
        required:true,
    },
    boardName:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true,
    },
    certificate:{
        type:String,
        length:1,
        required:true
    },
    subjectName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
   
},{
    timestamps:true,
})

const Note=mongoose.models.Note ||  mongoose.model("Note",notesSchema);
export default Note;