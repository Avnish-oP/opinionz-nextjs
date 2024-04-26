import dbConnect from "@/lib/dbConfig";
import { UserModel } from "@/models/user";
import bcryptjs from "bcryptjs";
import sendMail from "@/helpers/sendMail";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password, dob } = await req.json();
    console.log(username, email, password, dob);
    const existingUser = await UserModel.findOne({
      username,
      isverified: true,
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const existingUserEmail = await UserModel.findOne({ email });
    const verifyToken = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserEmail) {
      if (existingUserEmail.verified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        existingUserEmail.password = hashedPassword;
        existingUserEmail.verifyToken = verifyToken;
        existingUserEmail.verifyTokenExpires = new Date(Date.now() + 3600000);
        await existingUserEmail.save();
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        dateOfBirth: dob,
        verifyToken: verifyToken,
        verifyTokenExpires: expiryDate,
        verified: false,
        agreedPosts: [],
        disagreedPosts: [],
        comments: [],
        doddle: "",
      });
      await newUser.save();
    }
    const emailResponse = await sendMail(email, verifyToken, username);
    console.log(emailResponse);
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully and email sent for verification",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}
