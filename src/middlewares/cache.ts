import { Request, Response, NextFunction } from "express";
import redis from "../configs/redis";

const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lang = (req.query.lang as string);
  const cachedData = await redis.get(`faqs:${lang}`);

  if (cachedData) {
    console.log("Data fetched from cache");
    return res.send(JSON.parse(cachedData));
  }

  next();
};

export default cacheMiddleware;
