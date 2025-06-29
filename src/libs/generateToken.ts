import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserType } from "../models/User.model";
export async function generateAccessToken(user: UserType): Promise<string> {
  try {
    if (!user) {
      throw new Error("User object is required to generate access token");
    }

    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
}
