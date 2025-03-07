import mongoose, { Model, Document } from "mongoose";
const { Schema } = mongoose;
import { z } from "zod";

export const fileSchema = z.array(
  z.object({
    fileId: z.string(),
    createdAt: z.date(),
  })
);
export type FileType = z.infer<typeof fileSchema>;

export type UserType = {
  userName: string;
  email: string;
  password: string;
  image: [
    {
      fileId: string;
      createdAt: Date;
    }
  ];
  video: [
    {
      fileId: string;
      createdAt: Date;
    }
  ];
};
export interface IUser extends Document, UserType {}

const userSchema = new Schema<IUser>({
  userName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
  },
  image: [
    {
      fileId: {
        type: String, // Shorter way to define Schema.Types.String
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, // ✅ Correct default value
      },
    },
  ],
  video: [
    {
      fileId: {
        type: String, // Shorter way to define Schema.Types.String
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, // ✅ Correct default value
      },
    },
  ],
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export { UserModel as User };
