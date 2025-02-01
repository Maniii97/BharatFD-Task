import express from "express";
import { addFAQ, getFAQs } from "../controllers/faqController";
import cacheMiddleware from "../middlewares/cache";

const router = express.Router();

router.get("/", cacheMiddleware, getFAQs);
router.post("/", addFAQ);

export default router;
