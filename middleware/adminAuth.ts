import { users, WithAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const adminAuth = async (
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.auth.userId;
    console.log(req.auth.userId);
    if (!req.auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await users.getUser(req.auth?.userId);

    if (user.id !== process.env.USER_ID) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
