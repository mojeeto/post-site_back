import {
  model,
  Schema,
  Document,
  PopulatedDoc,
  PopulateOption,
  Types,
} from "mongoose";
import { IPost } from "./Post";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  posts: Types.DocumentArray<PopulatedDoc<IPost & Document>>;
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
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
