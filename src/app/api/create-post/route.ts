import dbConnect from "@/lib/dbConfig";
import { Post, PostModel } from "@/models/posts";
import { NextRequest,NextResponse } from "next/server";
import { UserModel } from "@/models/user";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {post_id, createdBy,content, createdAt,tags} : Post = await request.json();
    const user = await UserModel.findOne({username:createdBy,verified:true});
    if (!user){
        return NextResponse.json({
            success: false,
            message: "User not found"
        },{status:404});
    }
    const newPost = new PostModel({
        post_id,
        createdBy,
        content,
        createdAt,
        tags
    });
    await newPost.save();
    user.userPosts.push(post_id);
    await user.save();
    return NextResponse.json({
        success: true,
        message: "Post created successfully"
    },{status:201});
        
    } catch (error) {
        return NextResponse.json({success:false,message:"Something went wrong in creating post"},{status:500})
        
    }

}