import dbConnect from "@/lib/dbConnect.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/model/User";

export async function POST(request:NextRequest) {
  await dbConnect();
  try {
    const {username,email,phoneNumber,password}=await request.json();
    const hashedPassword=await bcryptjs.hashSync(password,10);
    const verifiedEmail= await User.findOne({email});
    if(verifiedEmail){
        return NextResponse.json({
            success:false,
            message:"emailId is already used "
        },{status:400})
    }

    const newUser=new User({
        username,
        email,
        phoneNumber,
        password:hashedPassword
    })

    await newUser.save();
    return NextResponse.json({
        success:true,
        message:"signup successfully"
    },{status:200})




  } catch (error) {
    console.log("signup error",(error));
        return NextResponse.json({
            success:false,
            message:"signup error"
        },{
            status:400
        }
    )
  }

}
