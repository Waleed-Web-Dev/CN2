import {Info} from "../model/info.js"
import {emailToClient, emailToAgency} from "../resend/email.js";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export const fillForm = async (req, res) => {
       try{
               const {name, email, phone, Q1, Q2, Q3, Q4, Q5, Q6, Q7} = req.body.data;
               console.log("In form controller", name);
               console.log(email);
               console.log(phone);
               console.log(Q1);
               console.log(Q2);
               console.log(Q3);
               console.log(Q4);
               console.log(Q5);
               console.log(Q6);
               console.log(Q7);

               const userInfo = new Info({
                       name: name,
                       email: email,
                       phone: phone,
                       Q1:Q1,
                       Q2:Q2,
                       Q3:Q3,
                       Q4:Q4,
                       Q5:Q5,
                       Q6:Q6,
                       Q7:Q7
               })

               await userInfo.save();

               const ai = new GoogleGenAI({});
               const prompt = `
               Please format your response using standard HTML tags (like "<p>", "<b>", and "<ul>") instead of Markdown. Do not include "<html>" or "<body>" tags, just the inner content.
               User Name: ${userInfo.name}
               Question Sequence: 
               {
        id: 1,
        question: "What best describes your business?",
        options: ["Realtor", "Real Estate Agency", "Property Developer", "Other"],
    },

    {
        id: 2,
        question: "What’s your biggest challenge with marketing right now?",
        options: ["Not getting enough leads", "Leads aren’t high quality", "No consistent content", "No brand presence"],
    },
    {
        id: 3,
        question: "Are you currently posting content?",
        options: ["Yes, consistently", "Yes, but inconsistent", "No consistent content", "Not at all"],
    },
    {
        id: 4,
        question: "Would you prioritize running ads if organic strategies are already working?",
        options: ["Yes, For Sure","Not at all"],
    },
    {
        id: 5,
        question: "How fast are you looking to grow?",
        options: ["1 Month","3 Months","6+ Months"],
    },
    {
        id: 6,
        question: "What's your main focus",
        options: ["Long Term Brand","Short Term Sales"],
    },
    {
        id: 7,
        question: "What is your budget per Month?",
        options: ["€3300+", "€6600+", "other"],
    }      
    
    You are a senior growth strategist at a real estate marketing agency for Content marketing especiallyy for instagram and GHL services at premium rates.
You specialize in lead generation, content strategy, paid advertising, and funnel optimization for real estate businesses.

Your task is to analyze a client’s onboarding questionnaire and produce:
1. A personalized marketing strategy tailored strictly to the client’s answers
2. A numerical Fit Score (0–100) representing how suitable the client is to work with our agency
3. A brief explanation justifying the score

### Rules & Guidelines
- Do NOT give generic marketing advice
- Base all recommendations strictly on the provided answers
- Be concise, professional, and actionable
- Assume the client is in the real estate industry
- If budget, urgency, or commitment is low, reflect this in the Fit Score
- Higher scores indicate strong budget, clear goals, urgency, and alignment with paid growth

Answers:
- Business Type (Q1): ${userInfo.Q1}
- Biggest Marketing Challenge (Q2): ${userInfo.Q2}
- Content Consistency (Q3): ${userInfo.Q3}
- Ad Priority (Q4): ${userInfo.Q4}
- Growth Timeline (Q5): ${userInfo.Q5}
- Primary Goal (Q6): ${userInfo.Q6}
- Monthly Budget (Q7): ${userInfo.Q7}

### Required Output Format (Strict)
Personalized Strategy: (Donot add the heading of Personalized Strategy in the output, include rest of headings)
- (Short, clear, tailored plan covering content, ads, and growth timeline)

Fit Score: X / 100

Fit Explanation:
- (2–3 sentences explaining why this score was assigned)
               `
               const promptScore = `
               User Name: ${userInfo.name}
               Question Sequence: 
               {
        id: 1,
        question: "What best describes your business?",
        options: ["Realtor", "Real Estate Agency", "Property Developer", "Other"],
    },

    {
        id: 2,
        question: "What’s your biggest challenge with marketing right now?",
        options: ["Not getting enough leads", "Leads aren’t high quality", "No consistent content", "No brand presence"],
    },
    {
        id: 3,
        question: "Are you currently posting content?",
        options: ["Yes, consistently", "Yes, but inconsistent", "No consistent content", "Not at all"],
    },
    {
        id: 4,
        question: "Would you prioritize running ads if organic strategies are already working?",
        options: ["Yes, For Sure","Not at all"],
    },
    {
        id: 5,
        question: "How fast are you looking to grow?",
        options: ["1 Month","3 Months","6+ Months"],
    },
    {
        id: 6,
        question: "What's your main focus",
        options: ["Long Term Brand","Short Term Sales"],
    },
    {
        id: 7,
        question: "What is your budget per Month?",
        options: ["€3300+", "€6600+", "other"],
    }      
    
    You are a senior growth strategist at a real estate marketing agency for Content marketing especiallyy for instagram and GHL services at premium rates.
You specialize in lead generation, content strategy, paid advertising, and funnel optimization for real estate businesses.

Your task is to analyze a client’s onboarding questionnaire and produce:
A one line saying you got X score out of 10 to work with us and if they are great fit or not short one liner only no formatting

### Rules & Guidelines
- Do NOT give generic marketing advice
- Base all recommendations strictly on the provided answers
- Be concise, professional, and actionable
- Assume the client is in the real estate industry
- If budget, urgency, or commitment is low, reflect this in the Fit Score
- Higher scores indicate strong budget, clear goals, urgency, and alignment with paid growth

Answers:
- Business Type (Q1): ${userInfo.Q1}
- Biggest Marketing Challenge (Q2): ${userInfo.Q2}
- Content Consistency (Q3): ${userInfo.Q3}
- Ad Priority (Q4): ${userInfo.Q4}
- Growth Timeline (Q5): ${userInfo.Q5}
- Primary Goal (Q6): ${userInfo.Q6}
- Monthly Budget (Q7): ${userInfo.Q7}


Required Output: 
A one line saying you got X score out of 10 to work with us and if they are great fit or not short one liner only no formatting

     
               `

               const response = await ai.models.generateContent({
                       model: "gemini-2.5-flash-lite",
                       contents: prompt
               })

               const responseScore = await ai.models.generateContent({
                       model: "gemini-2.5-flash-lite",
                       contents: promptScore
               })

               console.log(response.text)
               console.log(responseScore.text)

               await emailToClient(userInfo.email, userInfo.name, response.text);
               await emailToAgency(userInfo, response.text);
               res.status(200).json({
                       success: true,
                       message: `Answer received for ${name} with ${email}!`,
                       data: responseScore.text,
               })
       } catch (e) {
               console.log(`In Form Controller: ${e}`)
               res.status(400).json({
                       success: false,
                       message: `An error occurred in form controller: ${e}`,
               })
       }

}