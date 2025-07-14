import mongoose, { Model, Document } from "mongoose";
const { Schema } = mongoose;

export type SessionType = {
  name: string;
  bundlerId: string;
  expiresAt: number;
  readWritePermissions: {
    read: boolean;
    write: boolean;
  };
  key: string;
  ttlDate: Date;
};
export interface ISession extends Document, SessionType {}

const sessionSchema = new Schema<ISession>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  bundlerId: {
    type: Schema.Types.String,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
  readWritePermissions: {
    read: { type: Boolean, default: false },
    write: { type: Boolean, default: false },
  },
  key: {
    type: Schema.Types.String,
    required: true,
  },
  ttlDate: {
    type: Schema.Types.Date,
    required: true,
  },
});
sessionSchema.index({ ttlDate: 1 }, { expireAfterSeconds: 0 });
const SessionModel: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);
export { SessionModel as Session };
