import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  userPosts: string[];
  interests: string[];
  verifyToken: string;
  verifyTokenExpires: Date;
  verified: boolean;
  agreedPosts: string[];
  disagreedPosts: string[];
  comments: string[];
  doddle: string;
}

export interface Comments extends Document {
  comment_id: string;
  createdBy: string;
  content: string;
  createdAt: Date;
  agreedBy: string[];
  disagreedBy: string[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email id"],
    unique: true,
  },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  userPosts: { type: [String], required: false },
  interests: { type: [String], required: false },
  verifyToken: { type: String, required: false },
  verifyTokenExpires: { type: Date, required: false },
  verified: { type: Boolean, required: false },
  agreedPosts: { type: [String], required: false },
  disagreedPosts: { type: [String], required: false },
  comments: { type: [String], required: false },
  doddle: { type: String, required: false },
});

const commentSchema: Schema<Comments> = new Schema({
  comment_id: { type: String, required: true },
  createdBy: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  agreedBy: { type: [String], required: false },
  disagreedBy: { type: [String], required: false },
});

export const UserModel =
  mongoose.model<User>("User", userSchema) || mongoose.models.User;
export const CommentModel =
  mongoose.model<Comments>("Comment", commentSchema) || mongoose.models.Comment;
