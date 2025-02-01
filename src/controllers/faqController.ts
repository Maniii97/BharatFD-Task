import { Request, Response } from "express";
import FAQ from "../models/faq";
import redis from "../configs/redis";
import translateText from "../utils/translate";

const getFAQs = async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string;
    const cachedData = await redis.get(`faqs:${lang}`);
    if (cachedData) {
      return res.send(JSON.parse(cachedData));
    }
    const faqs = await FAQ.find();
    const translatedFaqs = await Promise.all(
      faqs.map(
        async (faq: {
          translations?: Map<string, string>;
          question: string;
          toObject: () => any;
        }) => {
          const translatedQuestion =
            faq.translations?.get(lang) ||
            (await translateText(faq.question, lang));
          return { ...faq.toObject(), question: translatedQuestion };
        }
      )
    );

    await redis.set(`faqs:${lang}`, JSON.stringify(translatedFaqs), "EX", 3600);
    res.json(translatedFaqs);
  } catch (err) {
    console.log("Error occured : /controllers/faqController/getFAQs : " + err);
    res.status(500).send("Internal Server Error");
  }
};

const addFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const translations = new Map();

    // TODO : Add Translate question to more langs
    translations.set("hi", await translateText(question, "hi"));
    translations.set("bn", await translateText(question, "bn"));

    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();

    res.status(201).json(newFAQ);
  } catch (error) {
    console.log("Error occured : /controllers/faqController/addFAQ : " + error);
    res.status(500).send("Internal Server Error");
  }
};

export { getFAQs, addFAQ };
