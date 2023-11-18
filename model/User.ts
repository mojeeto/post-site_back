import { model, Schema, Document, PopulatedDoc } from "mongoose";
import { IPost } from "./Post";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  posts: PopulatedDoc<IPost & Document>[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);