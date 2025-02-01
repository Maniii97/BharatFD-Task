import express from "express";
import { addFAQ } from "../controllers/faqController";

const router = express.Router();

// router.get("/",funA,funB)

router.post("/", addFAQ);

export default router;