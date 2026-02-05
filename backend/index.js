import express from 'express';
import dotenv from 'dotenv';
import {connectToDb} from './src/database/connectToDb.js';
import formRoutes from './src/routes/formRoutes.js';
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectToDb();
app.use(express.json());
app.use(cors({
    origin: `${process.env.frontendurl}`,
    credentials: true,
}))

app.get("/", (req,res) => {
    res.send("Starting");
})

app.use("/form", formRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})