import { Request } from "express";

export interface IGetUserInfoAuthRequest extends Request {
  user: { id: string };
}
