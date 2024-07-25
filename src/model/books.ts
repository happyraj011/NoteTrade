import mongoose from "mongoose";

const booksSchema=new mongoose.Schema({
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
    subjectName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    edition:{
        type:Number
    }
},{
    timestamps:true,
})

const Book=mongoose.models.Book ||  mongoose.model("Book",booksSchema);
export default Book;