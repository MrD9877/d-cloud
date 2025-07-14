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

export type BundlerType = {
  email: string;
  name: string;
  bundlerId: string;
  createdAt: number;
  mediaPermissions: {
    image: boolean;
    video: boolean;
  };
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
export interface IBundler extends Document, BundlerType {}

const bundlerSchema = new Schema<IBundler>({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: false,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  bundlerId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  mediaPermissions: {
    image: { type: Boolean, default: false },
    video: { type: Boolean, default: false },
  },
  image: [
    {
      fileId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Number,
        default: Date.now,
      },
    },
  ],
  video: [
    {
      fileId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Number,
        default: Date.now,
      },
    },
  ],
});

const BundlerModel: Model<IBundler> = mongoose.models.Bundler || mongoose.model<IBundler>("Bundler", bundlerSchema);
export { BundlerModel as Bundler };
