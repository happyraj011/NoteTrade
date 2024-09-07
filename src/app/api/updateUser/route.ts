import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/model/User';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
   
   
    if (body.password && body.password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters long',
        },
        { status: 400 }
      );
    }

   
    if (body.password) {
      body.password = bcryptjs.hashSync(body.password, 10);
    }

   
     const id = await getDataFromToken(request);
    
  
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    
    const { password, ...rest } = updateUser._doc;

    return NextResponse.json({
      success: true,
      data: rest,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while updating user',
      },
      { status: 500 }
    );
  }
}
