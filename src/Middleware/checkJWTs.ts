import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
export const checkJwt = function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = <string>req.headers['auth'];
  let jwtPayload;

  try {
    jwtPayload = <unknown>jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });
  res.setHeader('token', newToken);
  next();
};
