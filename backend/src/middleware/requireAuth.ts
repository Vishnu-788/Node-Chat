import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User from "../Models/userModel";
import { IGetUserInfoAuthRequest } from "../Interfaces/RequestInterface";

const requireAuth = async (
  req: IGetUserInfoAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization header is missing" });
    return;
  }

  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET as string);
    console.log("Log: requireAuth.ts, Decode Token: ", decodedToken);

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "_id" in decodedToken
    ) {
      req.user = await User.findOne({ _id: decodedToken._id }).select("_id");
      next(); // Call next() instead of returning a response
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
