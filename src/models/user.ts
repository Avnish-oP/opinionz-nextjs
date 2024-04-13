import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  userPosts: string[];
  interests: string[];
  verified: boolean;
  createdAt: Date;
  agreedPosts: string[];
  disagreedPosts: string[];
  comments: string[];
}

export interface Post extends Document {
  createdBy: string;
  content: string;
  createdAt: Date;
  agreedBy: string[];
  disagreedBy: string[];
  comments: string[];
}

const userSchema:Schema<User> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userPosts: { type: [String], required: false },
  interests: { type: [String], required: false },
  verified: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  agreedPosts: { type: [String], required: false },
  disagreedPosts: { type: [String], required: false },
  comments: { type: [String], required: false },
});

const postSchema : Schema<Post> = new Schema({
  createdBy: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true , default: Date.now()},
  agreedBy: { type: [String], required: false },
  disagreedBy: { type: [String], required: false },
  comments: { type: [String], required: false },
});


export const UserModel = mongoose.model<User>("User", userSchema)|| mongoose.models.User;
export const PostModel = mongoose.model<Post>("Post", postSchema) || mongoose.models.Post;



