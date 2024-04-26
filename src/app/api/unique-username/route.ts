import dbConnect from "@/lib/dbConfig";
import { UserModel } from "@/models/user";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request:NextRequest){
    await dbConnect();
    try {
        const {searchParams}=new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        }
        // console.log("queryParam", queryParam.username);
        //validation using zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log("result", result);
        if (!result.success){
            const usernameError = result.error.format().username?._errors || [];
            return NextResponse.json({
                success:false,
                message:usernameError?.length>0 ? usernameError.join(", "):"Invalid query parameter",
            },{status:400});
        }
        const {username} = result.data;
        const existingUserVerified = await UserModel.findOne({username:username,verified:true});
        if (existingUserVerified){
            return NextResponse.json({
                success:false,
                message:"Username is already taken",
            },{status:200});
        }
        else{
            return NextResponse.json({
                success:true,
                message:"Username is available",
            },{status:200});
        }
        
    } catch (error) {
        console.log("error checking username availability", error);
        return NextResponse.json({
            success: false,
            message: "Error checking username availability",
        },{status: 500});
    }
}