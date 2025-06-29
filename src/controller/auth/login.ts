import { Request, Response } from "express";
import User from "../../models/User.model";
import { generateAccessToken } from "../../libs/generateToken";
import { comparePassword } from "../../libs/hash";
export const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required" });
    }

    const user = await User.findOne({
      phoneNumber,
    });

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = await generateAccessToken(user);
    const { password: _pw, ...rest } = user.toObject();

    res.status(200).json({
      user: rest,
      accessToken,
      message: "User successfully logged in",
    });
  } catch (error) {
    console.error(
      `Login error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    res.status(500).json({ message: `Internal server error : ${error}` });
  }
};
