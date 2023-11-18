import { model, Schema, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  content: string;
  imagePath: string;
  creator: PopulatedDoc<IUser & Document>;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);
