import dbConnect from "@/lib/dbConfig";
import { UserModel } from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, interests } = await request.json();
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    user.interests = interests;
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Interests updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in posting interests", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    await dbConnect();
    try{
        const {searchParams} = new URL(request.url);
        const queryParam ={
            username: searchParams.get("username")
        }
        const user = await UserModel.findOne({username: queryParam.username, verified: true});
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {status: 404});
        }
        return NextResponse.json({
            success: true,
            interests: user.interests
        }, {status: 200});

    }catch(error){
        console.log("Error in getting interests", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {status: 500});
    }
}