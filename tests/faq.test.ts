import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbUrl = process.env.DB_URL;
if(!dbUrl) {
    throw new Error("DB_URL is not set in .env file");
}

describe("FAQ API Tests", () => {
  beforeAll(async () => {
    mongoose.connect(dbUrl);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should fetch all FAQs", async () => {
    const res = await request(app).get("/api/faq");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should add a new FAQ", async () => {
    const newFAQ = { question: "why are you high?", answer: "Yes" };
    const res = await request(app).post("/api/faq").send(newFAQ);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
