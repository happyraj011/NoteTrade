import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Note from "@/model/notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect(); 
  
  try {
    const id=await getDataFromToken(request);

    const product = await Note.aggregate([
      {
        $match:{
            userId:id
        }
      }
    ]).exec();

    if (!product || product.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Notes not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: product
    }, { status: 200 });

  } catch (error:any) {
    console.log("Get Notes error", { error });
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
