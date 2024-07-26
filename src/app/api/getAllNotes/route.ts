import dbConnect from "@/lib/dbConnect";
import Note from "@/model/notes";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
     try {
        dbConnect();
        const product=await Note.aggregate([
            {
                $sort:{
                    className:1
                }
            },{
                $limit:10
            }
        ]).exec()

        return NextResponse.json({
            message:product
          },{
            status:200
          })
     } catch (error:any) {
        console.log("get Notes error",{error})
        return NextResponse.json({
           success:false,
           message:error.message
         },{status:500})
     }
}
