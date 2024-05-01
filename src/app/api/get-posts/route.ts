import dbConnect from "@/lib/dbConfig";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user";
import { PostModel } from "@/models/posts";

export async function GET(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user;
  if (!sessionUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized please login",
      },
      { status: 401 }
    );
  }
  try {
    const user = await UserModel.findOne({
      username: sessionUser.username,
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const interests = user.interests;
    const posts = await PostModel.find({ tags: { $in: interests } });
    return NextResponse.json(
      {
        success: true,
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in getting posts",
      },
      { status: 500 }
    );
  }
}
