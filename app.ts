import express, { Request, Response } from 'express';
import connectDB from './src/configs/mongo';
import { config } from 'dotenv';
import cors from 'cors';
import redis from './src/configs/redis';
import translateText from './src/utils/translate';
import faqRoute from "./src/routes/faq";

config();
const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = { origin: "*", optionsSuccessStatus: 200};
app.use(cors(corsOptions));

app.use(express.json());    // Parse JSON bodies to all routes

//Routes
app.get("/",(req : Request , res : Response)=>{
    res.send("Hello World! this server was made by express CLI");
});

app.use("/api/faq", faqRoute);

// global catches
app.all("*", (_req, _res) => {
    _res.status(404).send("Page Not Found");
});

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();

export default app;


