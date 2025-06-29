import mongoose from "mongoose";

export interface IUser {
  phoneNumber: string;
  password: string;
}

const UserModel = new mongoose.Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserModel);
export default User;

export type UserType = mongoose.HydratedDocument<IUser>;
