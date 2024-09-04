import { NextFunction, Request, Response } from "express";
import ApiError from "../../../../infra/errors/ApiError";
import { decode } from "jsonwebtoken";

interface IJwtPayload {
  userId: string;
}

export default function ensureUserAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];

  if (!authorization) throw new ApiError('Forbidden!', 401);

  const [, token] = authorization.split(' ');

  if (!token) throw new ApiError('Forbidden!', 401);

  try {
    const decoded = decode(token) as IJwtPayload;

    req.user = { id: decoded.userId };

    next();
  } catch {
    throw new ApiError('Unauthorized!', 403);
  }
}
