import dbConnect from "@/lib/dbConnect";
import Book from "@/model/books";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
     try {
      await dbConnect();
        const product=await Book.aggregate([
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
        console.log("get Book error",{error})
        return NextResponse.json({
           success:false,
           message:error.message
         },{status:500})
     }
}
