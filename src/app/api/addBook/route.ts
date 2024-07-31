import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Book from "@/model/books";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  dbConnect();
  try {
    const reqBody=await request.json();
    if(!reqBody.boardName ||  !reqBody.className  ||  !reqBody.subjectName  ||  
        !reqBody.price ||  !reqBody.content){
             return NextResponse.json({
             success:false,
             message:"Please provide all required fields",
        },{
            status:400,
        })
    }  

    

    const user=await getDataFromToken(request);

    const title=user+reqBody.boardName+reqBody.className+reqBody.subjectName+reqBody.edition;
    const slug=title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newBook=new Book({
        ...reqBody,
        slug,
        userId:user
    })
    await newBook.save();
    return NextResponse.json({
        success:true,
        message:"Book is added successfully"
      },{
        status:200
      })




  } catch (error:any) {
    console.log("add Book error",{error})
    return NextResponse.json({
       success:false,
       message:error.message
     },{status:500})
  }
}
