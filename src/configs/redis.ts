import Redis from "ioredis";
import { config } from "dotenv";

config();

const url = process.env.REDIS_URL as string;
const redis = new Redis(url);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.log("Error occured : " + err);
});

export default redis;
