import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: new mongoose.Schema({
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      }),
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @param language
 * @returns translated text of the answer in the specified language
 * this is a method that will be available on each instance of the model,
 * it will return the translated text of the answer in the specified language
 * default language is english
 */
faqSchema.methods.getTranslatedText = function (language: string) {
  return this.translations?.get(language) || this.answer;
};

const faq = mongoose.model("faq", faqSchema);
export default faq;
