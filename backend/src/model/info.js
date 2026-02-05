import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        Q1: { type: String, required: true },
        Q2: { type: String, required: true },
        Q3: { type: String, required: true },
        Q4: { type: String, required: true },
        Q5: { type: String, required: true },
        Q6: { type: String, required: true },
        Q7: { type: String, required: true },
})

export const Info = mongoose.model("Info", infoSchema);