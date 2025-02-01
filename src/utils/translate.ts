import { translate } from "@vitalets/google-translate-api";

const translateText = async (text: string, targetLang: string) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (err) {
    console.log("Tranlsation failed : /services/translate : " + err);
    return text;
  }
};

export default translateText;
