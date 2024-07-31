import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Note from "@/model/notes";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  dbConnect();
  try {
    const reqBody=await request.json();
    if(!reqBody.boardName ||  !reqBody.className  ||  !reqBody.score ||  !reqBody.subjectName  ||   !reqBody.price ||  !reqBody.content ){
             return NextResponse.json({
             success:false,
             message:"Please provide all required fields",
        },{
            status:400,
        })
    }  

    const user=await getDataFromToken(request);

    const title=user+reqBody.boardName+reqBody.className+reqBody.subjectName;
    const slug=title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newNote=new Note({
        ...reqBody,
        slug,
        userId:user
    })
    await newNote.save();
    return NextResponse.json({
        success:true,
        message:"Notes is added successfully"
      },{
        status:200
      })




  } catch (error:any) {
    console.log("add Notes error",{error})
    return NextResponse.json({
       success:false,
       message:error.message
     },{status:500})
  }
}
