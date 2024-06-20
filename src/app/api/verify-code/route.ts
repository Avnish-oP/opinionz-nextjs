import dbConnect from "@/lib/dbConfig";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {username, code } = await request.json();
    
    
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      console.log(username, code);
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyToken === code;
    const isCodeExpired = new Date() > new Date(user.verifyTokenExpires);
    if (isCodeValid && !isCodeExpired) {
      user.verified = true;
      await user.save();
      return NextResponse.json(
        {
          success: true,
          message: "Code verified successfully",
        },
        { status: 200 }
      );
    } else if (isCodeExpired) {
      return NextResponse.json(
        {
          success: false,
          message: "expired code please signup again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("error verifying code", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error verifying code",
      },
      { status: 500 }
    );
  }
}
