import { Request, Response } from "express";
import FAQ from "../models/faq";
import redis from "../configs/redis";
import translateText from "../utils/translate";

const getFAQs = async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string;
    const cachedData = await redis.get(`faqs:${lang}`);
    if (cachedData) {
      res.status(200).send(JSON.parse(cachedData));
      return;
    }
    console.log("the code is getting here even after answered from cache")
    const faqs = await FAQ.find();
    const translatedFaqs = await Promise.all(
      faqs.map(
        async (faq: {
          answer: string;
          translations?: Map<string, { question: string; answer: string }>;
          question: string;
          toObject: () => any;
        }) => {
            const translatedQuestion =
              faq.translations?.get(lang)?.question ||
              (await translateText(faq.question, lang));
            const translatedAnswer =
              faq.translations?.get(lang)?.answer ||
              (await translateText(faq.answer, lang));
            return { ...faq.toObject(), question: translatedQuestion, answer: translatedAnswer };
          }
      )
    );

    await redis.set(`faqs:${lang}`, JSON.stringify(translatedFaqs), "EX", 3600);
    res.json(translatedFaqs);
  } catch (err) {
    console.log("Error occured : @/controllers/faqController/getFAQs : " + err);
    res.status(500).send("Internal Server Error");
  }
};

const addFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const translations = new Map();

    const languages = ["hi", "bn"];

    for (const lang of languages) {
      translations.set(lang, {
        question: await translateText(question, lang),
        answer: await translateText(answer, lang),
      });
    }

    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();
    console.log("New FAQ added : " + newFAQ);

    res.status(201).json(newFAQ);
  } catch (error) {
    console.log("Error occured : @/controllers/faqController/addFAQ : " + error);
    res.status(500).send("Internal Server Error");
  }
};

export { getFAQs, addFAQ };
