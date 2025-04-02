import dbConnect from "@/lib/dbConnect";
import Book from "@/model/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const products = await Book.find().sort({ createdAt: -1 }).limit(10).lean();

    return new NextResponse(
      JSON.stringify({ message: products }),
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error: any) {
    console.error("getBook error", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
