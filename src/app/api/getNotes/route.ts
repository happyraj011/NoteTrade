import dbConnect from "@/lib/dbConnect";
import Note from "@/model/notes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect(); 
  
  try {
    const url = new URL(request.url);
    const className = url.searchParams.get("className");
    const boardName = url.searchParams.get("boardName");
    const slug=url.searchParams.get("slug")
   
    const filter: any = {};
    if (className) filter.className = className;
    if (boardName) filter.boardName = boardName;
    if (slug) filter.slug = slug;

    

    const product = await Note.aggregate([
      {
        $match: filter
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
