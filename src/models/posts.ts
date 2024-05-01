import mongoose,{Document,Schema} from "mongoose";

export interface Post extends Document {
    post_id: string;
    createdBy: string;
    content: string;
    createdAt: Date;
    tags: string[];
    agreedBy: string[];
    disagreedBy: string[];
    comments: string[];
  }

  const postSchema : Schema<Post> = new Schema({
    post_id: { type: String, required: true, unique: true},
    createdBy: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true , default: Date.now()},
    tags: { type: [String], required: true },
    agreedBy: { type: [String], required: false },
    disagreedBy: { type: [String], required: false },
    comments: { type: [String], required: false },
  });

  export const PostModel =mongoose.models.Post  || mongoose.model<Post>("Post", postSchema);
