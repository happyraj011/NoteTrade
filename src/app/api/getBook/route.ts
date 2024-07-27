import dbConnect from "@/lib/dbConnect";
import Book from "@/model/books";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect(); 
  
  try {
    const url = new URL(request.url);
    const className = url.searchParams.get("className");
    const boardName = url.searchParams.get("boardName");

    if (!className || !boardName) {
      return NextResponse.json({
        success: false,
        message: "Missing query parameters"
      }, { status: 400 });
    }

    const product = await Book.aggregate([
      {
        $match: {
          className: className,
          boardName: boardName
        }
      }
    ]).exec();

    if (!product || product.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Book not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: product
    }, { status: 200 });

  } catch (error:any) {
    console.log("Get Book error", { error });
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
